const connection = require("../configs/database");

// phân trang
const displayCategorary = async (page, limit) => {
  try {
    // throw new Error("Simulated database error for testing");
    const offset = (page - 1) * limit; // Tính vị trí bắt đầu

    // Đếm tổng số danh mục
    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS total FROM categories"
    );
    //  return ra 7

    const totalItems = countResult[0].total;

    // Lấy danh sách danh mục với LIMIT và OFFSET
    const [results] = await connection.query(
      "SELECT * FROM categories ORDER BY created_at ASC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    return {
      categories: results,
      totalItems,
    };
  } catch (error) {
    throw new error("Failed to fetch categories: " + error.message);
  }
};
const createCatrgory = async (id, name, des, create_at) => {
  let [results, fields] = await connection.query(
    `INSERT INTO categories(id, name, description, created_at)
        VALUES (?, ?, ?, ?)`,
    [id, name, des, create_at]
  );
};
const checkUniqueId = async (id) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM categories WHERE id = ?",
    [id]
  );
  return rows[0].count === 0; // Trả về true nếu id là duy nhất
};
const deleteCategorary = async (id) => {
  let [results, fields] = await connection.query(
    `DELETE FROM categories WHERE id = ?`,
    [id]
  );
};
const checkCategoryUsedInProduct = async (categoryName) => {
  let [results, fields] = await connection.query(
    `SELECT COUNT(*) AS count FROM products WHERE category_name = ?`,
    [categoryName]
  );
  return results[0].count > 0; // Nếu có bản ghi sử dụng tên danh mục, trả về true
};
const updateCategory = async (id, name, des) => {
  let [results, fields] = await connection.query(
    `UPDATE categories
    SET name = ?, description = ?
    WHERE id = ?`,
    [name, des, id]
  );
};
const createRequest = async (
  id,
  name,
  product,
  quantity,
  start_date,
  end_date,
  create_at
) => {
  let [results, fields] = await connection.query(
    `INSERT INTO request (id, name_employee, name_product, quantity, start_date, end_date, created_at, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, "Chờ")`,
    [id, name, product, quantity, start_date, end_date, create_at] // Thêm các giá trị vào đây
  );
};
const displayRequest = async (req, res) => {
  let [results, fields] = await connection.query(`
    SELECT * FROM request WHERE status = 'Chờ' ORDER BY created_at ASC;
    `);
  return results;
};

module.exports = {
  displayCategorary,
  createCatrgory,
  checkUniqueId,
  deleteCategorary,
  checkCategoryUsedInProduct,
  updateCategory,
  createRequest,
  displayRequest,
};
