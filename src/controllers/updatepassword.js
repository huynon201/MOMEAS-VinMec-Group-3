// updatePassword.js
const bcrypt = require("bcrypt");

const updatePassword = async (pwd) => {
  try {
    // Băm mật khẩu mới
    const hashedPassword = await bcrypt.hash(pwd, 10);
    console.log("mã hóa thành công!!");
    return hashedPassword;
  } catch (error) {
    console.error("Lỗi khi cập nhật mật khẩu:", error);
  } finally {
    // Đóng kết nối cơ sở dữ liệu
  }
};

module.exports = updatePassword;
