const connection = require("../configs/database");
const displayImport = async (page = null, limit = null) => {
  if (page === null || limit === null) {
    // Lấy toàn bộ danh sách nhân viên
    const [results] = await connection.query(
      `SELECT name FROM imports ORDER BY name`
    );
    return results;
  } else {
    const offset = (page - 1) * limit; // Tính vị trí bắt đầu

    // Đếm tổng số danh mục
    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS total FROM imports"
    );

    const totalItems = countResult[0].total;

    let [results, fields] = await connection.query(
      `SELECT * FROM imports ORDER BY created_at ASC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return {
      im: results,
      totalItems,
    };
  }
};
const checkUniqueId = async (id) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM imports WHERE id = ?",
    [id]
  );
  return rows[0].count === 0; // Trả về true nếu id là duy nhất
};
const displayDetail = async (nameImport) => {
  const sql = `SELECT * FROM importDetails WHERE name_import = ?`;
  let [results] = await connection.query(sql, [nameImport]);
  return results;
};
const createImport = async (id, name_import, create_at) => {
  let [results, fields] = await connection.query(
    `INSERT INTO imports (id,name, created_at) VALUES (?, ?, ?)`,
    [id, name_import, create_at]
  );
};
const createImportDetails = async (name_import, producttb, quantity) => {
  var importDetails;
  if (Array.isArray(producttb)) {
    // Kiểm tra producttb có phải là mảng không
    importDetails = producttb.map((product, index) => {
      return [product, quantity[index], name_import];
    });
  } else {
    importDetails = [[producttb, quantity, name_import]]; // Đảm bảo đúng cấu trúc cho 1 bản ghi
  }

  const sql = `INSERT INTO importDetails (name_product, quantity_product, name_import)
          VALUES ?`;
  const sqlUpdate = `UPDATE products SET quantity = ? WHERE name = ?`;
  const sqlQuantity = `SELECT quantity FROM products WHERE name = ?`;

  try {
    for (let i = 0; i < importDetails.length; i++) {
      const [productName, qty, nameImport] = importDetails[i];

      // Lấy số lượng hiện tại

      const [totalProduct] = await connection.query(sqlQuantity, [productName]);

      if (totalProduct.length === 0) {
        throw new Error(`Sản phẩm ${productName} không tồn tại.`);
      }

      const totalItems = totalProduct[0].quantity;

      // Tính toán số lượng còn lại
      const remainItems = totalItems + Number(qty);

      // Cập nhật tồn kho
      await connection.query(sqlUpdate, [remainItems, productName]);
    }

    // Thêm dữ liệu vào bảng importDetails
    const [result] = await connection.query(sql, [importDetails]);

    return {
      success: true,
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu:", error);
    throw error;
  }
};
module.exports = {
  displayImport,
  displayDetail,
  checkUniqueId,
  createImport,
  createImportDetails,
};
