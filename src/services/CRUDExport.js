const connection = require("../configs/database");
const displayExport = async (page = null, limit = null) => {
  if (page === null || limit === null) {
    // Lấy toàn bộ danh sách nhân viên
    const [results] = await connection.query(
      `SELECT name FROM exports ORDER BY name`
    );
    return results;
  } else {
    const offset = (page - 1) * limit; // Tính vị trí bắt đầu

    // Đếm tổng số danh mục
    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS total FROM exports"
    );

    const totalItems = countResult[0].total;

    let [results, fields] = await connection.query(
      `SELECT * FROM exports ORDER BY created_at ASC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return {
      ex: results,
      totalItems,
    };
  }
};

const checkUniqueId = async (id) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM exports WHERE id = ?",
    [id]
  );
  return rows[0].count === 0; // Trả về true nếu id là duy nhất
};
const createExport = async (
  id,
  name_export,
  department,
  name_employee,
  create_at
) => {
  let [results, fields] = await connection.query(
    `INSERT INTO exports (id,name, name_department, name_employee, created_at) VALUES (?, ?, ?, ?, ?)`,
    [id, name_export, department, name_employee, create_at]
  );
};

const createExportDetails = async (name_export, producttb, quantity) => {
  var exportDetails;
  if (Array.isArray(producttb)) {
    // Kiểm tra producttb có phải là mảng không
    exportDetails = producttb.map((product, index) => {
      return [product, quantity[index], name_export];
    });
  } else {
    exportDetails = [[producttb, quantity, name_export]]; // Đảm bảo đúng cấu trúc cho 1 bản ghi
  }

  const sql = `INSERT INTO exportDetails (name_product, quantity_product, name_export)
        VALUES ?`;
  const sqlUpdate = `UPDATE products SET quantity = ? WHERE name = ?`;
  const sqlQuantity = `SELECT quantity FROM products WHERE name = ?`;

  try {
    for (let i = 0; i < exportDetails.length; i++) {
      const [productName, qty, nameExport] = exportDetails[i];

      // Lấy số lượng hiện tại

      const [totalProduct] = await connection.query(sqlQuantity, [productName]);

      if (totalProduct.length === 0) {
        throw new Error(`Sản phẩm ${productName} không tồn tại.`);
      }

      const totalItems = totalProduct[0].quantity;

      // Kiểm tra tồn kho
      if (totalItems < qty) {
        throw new Error(
          `Số lượng không đủ cho sản phẩm ${productName}. Tồn kho: ${totalItems}, yêu cầu: ${qty}`
        );
      }

      // Tính toán số lượng còn lại
      const remainItems = totalItems - Number(qty);

      // Cập nhật tồn kho
      await connection.query(sqlUpdate, [remainItems, productName]);
    }

    // Thêm dữ liệu vào bảng exportDetails
    const [result] = await connection.query(sql, [exportDetails]);

    return {
      success: true,
      affectedRows: result.affectedRows,
    };
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu:", error);
    throw error;
  }
};
const displayDetail = async (nameExport) => {
  const sql = `SELECT * FROM exportDetails WHERE name_export = ?`;
  let [results] = await connection.query(sql, [nameExport]);
  return results;
};

module.exports = {
  displayExport,
  createExport,
  checkUniqueId,
  createExportDetails,
  displayDetail,
};
