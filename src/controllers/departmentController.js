const {
  displayDepartment,
  createDepartment,
  checkUniqueId,
  deleteDepartment,
  updateDepartment,
} = require("../services/CRUDDepartment");
const { generateRandomId } = require("../untils/randomUntils");
var moment = require("moment");

const getDepartmentPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  const { department, totalItems } = await displayDepartment(page, limit);
  const totalPages = Math.ceil(totalItems / limit);
  return res.render("department.ejs", {
    activePage: "department",
    listdepartment: department,
    currentPage: page,
    totalPages,
  });
};
const postCreateDepartment = async (req, res) => {
  let id;
  let isUnique = false;
  while (!isUnique) {
    id = generateRandomId();
    isUnique = await checkUniqueId(id);
  }
  const { name, des } = req.body;
  const at = new Date();
  const create_at = moment(at).format("YYYY-MM-DD HH:mm:ss");
  console.log(create_at);
  await createDepartment(id, name, des, create_at);
  res.redirect("back");
};

const postDeleteDepartment = async (req, res) => {
  const id = req.body.id;
  await deleteDepartment(id);
  res.redirect("back");
};
const postUpdateDepartment = async (req, res) => {
  const { editUserId, name, des } = req.body;
  await updateDepartment(editUserId, name, des);
  res.redirect("back");
};
module.exports = {
  getDepartmentPage,
  postCreateDepartment,
  postDeleteDepartment,
  postUpdateDepartment,
};
