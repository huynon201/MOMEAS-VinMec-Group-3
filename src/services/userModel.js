const connection = require("../configs/database");
// login-feature
const findUserByUserName = async (username) => {
  let [results, fields] = await connection.query(
    `SELECT * FROM accounts WHERE name_account = ?`,
    [username]
  );
  return results[0];
};

module.exports = {
  findUserByUserName,
};
