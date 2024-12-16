const { displayEmployee } = require("../services/CRUDEmployee");
const {
  displayAccount,
  checkUniqueId,
  createAccount,
  displayRole,
  deleteAccount,
  updateAccount,
} = require("../services/CRUDAcount");
const updatePassword = require("./updatepassword");
const { generateRandomId } = require("../untils/randomUntils");
var moment = require("moment");

const getAccountPage = async (req, res) => {
  let employee = await displayEmployee();
  let role = await displayRole();
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
  const limit = 5; // Số phần tử mỗi trang
  let { account, totalItems } = await displayAccount(page, limit);
  const totalPages = Math.ceil(totalItems / limit);
  try {
    // throw new Error("Simulated database error for testing");

    return res.render("account.ejs", {
      activePage: "account",
      listEmployee: employee,
      listAccount: account,
      listRole: role,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return res.render("account.ejs", {
      activePage: "account",
      listEmployee: employee,
      listAccount: [],
      listRole: role,
      currentPage: 1,
      totalPages: 0,
      errorMessage: "LỖI!! Không thể lấy được danh sách tài khoản.",
    });
  }
};
const postCreateAccount = async (req, res) => {
  try {
    let id;
    let isUnique = false;
    while (!isUnique) {
      id = generateRandomId();
      isUnique = await checkUniqueId(id);
    }
    const at = new Date();
    const create_at = moment(at).format("YYYY-MM-DD HH:mm:ss");
    const { name_employee, name_account, pwd, role } = req.body;
    const password = await updatePassword(pwd);

    await createAccount(
      id,
      name_employee,
      name_account,
      password,
      role,
      create_at
    );
    res.json({ status: "success", message: "Thêm tài khoản thành công!", id });
  } catch (error) {
    res.json({
      status: "error",
      message: "Không thể thêm tài khoản. Vui lòng thử lại!",
    });
  }
};
const postDeleteAccount = async (req, res) => {
  try {
    const id = req.body.id;
    await deleteAccount(id);
    res.redirect("back");
  } catch (error) {
    res.json({
      status: "error",
      message: "Không thể Xóa tài khoản. Vui lòng thử lại!",
    });
  }
};
const postUpdateAccount = async (req, res) => {
  try {
    const { editAccountId, name_employee, name_account, pwd, role } = req.body;
    console.log("req.body :>> ", req.body);
    const password = await updatePassword(pwd);
    await updateAccount(
      editAccountId,
      name_employee,
      name_account,
      password,
      role
    );
    res.json({
      status: "success",
      message: "Update tài khoản thành công!",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Không thể update tài khoản. Vui lòng thử lại!",
    });
  }
};
module.exports = {
  getAccountPage,
  postCreateAccount,
  postDeleteAccount,
  postUpdateAccount,
};
