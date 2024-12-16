var multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, "./src/public/assets/content/upload");
  },
  filename: (req, file, res) => {
    res(null, file.originalname);
  },
});
const uploadE = multer({ storage: storage });

const {
  displayEmployee,
  displayDepartment,
  checkUniqueId,
  createDepartment,
  deleteEmployee,
  updateEmployee,
} = require("../services/CRUDEmployee");
const { generateRandomId } = require("../untils/randomUntils");
var moment = require("moment");

const getemployeePage = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
  const limit = 10; // Số phần tử mỗi trang
  let { employee, totalItems } = await displayEmployee(page, limit);
  const totalPages = Math.ceil(totalItems / limit);
  let department = await displayDepartment();
  return res.render("employee.ejs", {
    activePage: "employee",
    listEmployee: employee,
    listDepartment: department,
    currentPage: page,
    totalPages,
  });
};

const postCreateEmployee = async (req, res) => {
  let id;
  let isUnique = false;
  while (!isUnique) {
    id = generateRandomId();
    isUnique = await checkUniqueId(id);
  }
  const image = req.files.image[0].filename;
  const at = new Date();
  const create_at = moment(at).format("YYYY-MM-DD HH:mm:ss");
  const { name, department, regency, phoneNumber, address } = req.body;
  await createDepartment(
    id,
    name,
    department,
    regency,
    phoneNumber,
    address,
    create_at,
    image
  );
  res.redirect("back");
};
const postDeleteEmployee = async (req, res) => {
  const id = req.body.id;
  await deleteEmployee(id);
  res.redirect("back");
};
const postUpdateEmployee = async (req, res) => {
  const image = req.files.image[0].filename;
  const { editemployeeId, name, department, regency, phoneNumber, address } =
    req.body;
  await updateEmployee(
    editemployeeId,
    name,
    department,
    regency,
    phoneNumber,
    address,
    image
  );
  res.redirect("back");
};
module.exports = {
  getemployeePage,
  postCreateEmployee,
  postDeleteEmployee,
  postUpdateEmployee,
  uploadE,
};
