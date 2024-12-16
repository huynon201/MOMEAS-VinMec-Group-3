const connection = require("../configs/database");
const displayEmployee = async (page = null, limit = null) => {
  if (page === null || limit === null) {
    // Lấy toàn bộ danh sách nhân viên
    const [results] = await connection.query(
      `SELECT name_employee FROM employees ORDER BY name_employee`
    );
    return results;
  } else {
    const offset = (page - 1) * limit; // Tính vị trí bắt đầu
    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS total FROM employees"
    );
    const totalItems = countResult[0].total;

    const [results] = await connection.query(
      `SELECT * FROM employees ORDER BY created_at ASC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return {
      employee: results,
      totalItems,
    };
  }
};

const displayDepartment = async (req, res) => {
  let [result, fields] = await connection.query(`SELECT name FROM departments`);
  return result;
};
const checkUniqueId = async (id) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM departments WHERE id = ?",
    [id]
  );
  return rows[0].count === 0; // Trả về true nếu id là duy nhất
};
const createDepartment = async (
  id,
  name,
  department,
  regency,
  phoneNumber,
  address,
  create_at,
  image
) => {
  let results = await connection.query(
    `INSERT INTO employees (id, name_employee, name_department, role, phone, address, created_at, image) VALUES (?, ? ,?, ?,?,?, ?, ?)`,
    [id, name, department, regency, phoneNumber, address, create_at, image]
  );
};
const deleteEmployee = async (id) => {
  let results = await connection.query(`DELETE FROM employees WHERE id = ?`, [
    id,
  ]);
};
const updateEmployee = async (
  editemployeeId,
  nameEdit,
  modalEditE,
  regencyEdit,
  phoneNumberEdit,
  addressEdit,
  image
) => {
  let [result, fields] = await connection.query(
    `UPDATE employees SET name_employee = ?, name_department =?, role = ?, phone= ?, address=?, image = ? WHERE id = ?`,
    [
      nameEdit,
      modalEditE,
      regencyEdit,
      phoneNumberEdit,
      addressEdit,
      image,
      editemployeeId,
    ]
  );
};
const getUserAvatar = async (id) => {
  const [results, fields] = await connection.query(
    "SELECT image, name_employee, role FROM employees WHERE name_employee = ?",
    [id]
  );
  return results[0];
};
module.exports = {
  displayEmployee,
  displayDepartment,
  checkUniqueId,
  createDepartment,
  deleteEmployee,
  updateEmployee,
  getUserAvatar,
};
