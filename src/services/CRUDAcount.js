const connection = require("../configs/database");
const displayAccount = async (page, limit) => {
  const offset = (page - 1) * limit; // Tính vị trí bắt đầu

  // Đếm tổng số danh mục
  const [countResult] = await connection.query(
    "SELECT COUNT(*) AS total FROM accounts"
  );
  const totalItems = countResult[0].total;
  let [results, fields] = await connection.query(
    `SELECT * FROM accounts ORDER BY created_at ASC LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  return {
    account: results,
    totalItems,
  };
};
const checkUniqueId = async (id) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) AS count FROM accounts WHERE id = ?",
    [id]
  );
  return rows[0].count === 0; // Trả về true nếu id là duy nhất
};
const createAccount = async (
  id,
  name_employee,
  name_account,
  password,
  role,
  create_at
) => {
  let results = await connection.query(
    `INSERT INTO accounts (id, name_employee, name_account, password, role, created_at) VALUE (?,?,?,?,?, ?)`,
    [id, name_employee, name_account, password, role, create_at]
  );
};
const displayRole = async (req, res) => {
  let [results, fields] = await connection.query(`SELECT id, name FROM roles`);
  return results;
};
const deleteAccount = async (id) => {
  let [results, fields] = await connection.query(
    `DELETE FROM accounts WHERE id = ? `,
    [id]
  );
};
const updateAccount = async (id, name_employee, name_account, pwd, role) => {
  let [results, fields] = await connection.query(
    `UPDATE accounts SET name_employee = ?, name_account = ?, password = ?, role = ? WHERE id = ?`,
    [name_employee, name_account, pwd, role, id]
  );
};
module.exports = {
  displayAccount,
  checkUniqueId,
  createAccount,
  displayRole,
  deleteAccount,
  updateAccount,
};
