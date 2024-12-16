const connection = require("../configs/database");
const displayDepartment = async (page = null, limit = null) => {
  if (page === null || limit === null) {
    // Lấy toàn bộ danh sách nhân viên
    const [results] = await connection.query(
      `SELECT name FROM departments ORDER BY name`
    );
    return results;
  } else {
    const offset = (page - 1) * limit; // Tính vị trí bắt đầu
    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS total FROM departments"
    );

    const totalItems = countResult[0].total;

    const [results] = await connection.query(
      "SELECT * FROM departments ORDER BY created_at ASC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    return {
      department: results,
      totalItems,
    };
  }
};

const createDepartment = async (id, name, des, create_at) => {
  let [results, fields] = await connection.query(
    `INSERT INTO departments (id, name, description, created_at) VALUES (?, ?, ?, ?)`,
    [id, name, des, create_at]
  );
};
const checkUniqueId = async (id) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM departments WHERE id = ?",
    [id]
  );
  return rows[0].count === 0; // Trả về true nếu id là duy nhất
};
const deleteDepartment = async (id) => {
  let results = connection.query(`DELETE FROM departments WHERE id = ?`, [id]);
};
const updateDepartment = async (editUserId, name, des) => {
  let results = connection.query(
    `UPDATE departments 
    SET name = ?, description = ? WHERE id = ?`,
    [name, des, editUserId]
  );
  return results;
};
module.exports = {
  displayDepartment,
  createDepartment,
  checkUniqueId,
  deleteDepartment,
  updateDepartment,
};
