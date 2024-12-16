const connection = require("../configs/database");
const displayProduct = async (page = null, limit = null) => {
  if (page === null || limit === null) {
    // Lấy toàn bộ danh sách nhân viên
    const [results] = await connection.query(
      `SELECT name, id, quantity FROM products ORDER BY name`
    );
    return results;
  } else {
    const offset = (page - 1) * limit; // Tính vị trí bắt đầu

    // Đếm tổng số danh mục
    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS total FROM products"
    );
    const totalItems = countResult[0].total;
    let [results, fields] = await connection.query(
      `SELECT * FROM products ORDER BY created_at ASC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return {
      products: results,
      totalItems,
    };
  }
};
const checkUniqueId = async (id) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM products WHERE id = ?",
    [id]
  );
  return rows[0].count === 0; // Trả về true nếu id là duy nhất
};
const createProducts = async (
  id,
  name,
  des,
  quantity,
  brand,
  color,
  size,
  image,
  category,
  create_at
) => {
  let [result, fields] = await connection.query(
    `INSERT INTO products (id, name, description, quantity, brand, color, size , category_name, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, name, des, quantity, brand, color, size, image, category, create_at]
  );
};

const displayCategory = async (req, res) => {
  let [result, fields] = await connection.query(`SELECT name FROM categories`);
  return result;
};

const deleteProduct = async (id) => {
  let [result, fields] = await connection.query(
    `DELETE FROM products WHERE id = ?`,
    [id]
  );
};
const updateProduct = async (
  id,
  name,
  des,
  brand,
  size,
  category,
  color,
  image,
  quantity
) => {
  let [result, fields] = await connection.query(
    `UPDATE products SET name = ?, description = ?, quantity = ?, brand = ?, color = ?, size = ?, image = ?, category_name = ? WHERE id = ?`,
    [name, des, quantity, brand, color, size, image, category, id]
  );
};
module.exports = {
  createProducts,
  checkUniqueId,
  displayProduct,
  displayCategory,
  deleteProduct,
  updateProduct,
};
