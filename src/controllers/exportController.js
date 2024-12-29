const connection = require("../configs/database");

const { displayEmployee } = require("../services/CRUDEmployee");
const { displayDepartment } = require("../services/CRUDDepartment");
const { displayProduct } = require("../services/CRUDProduct");
const { generateRandomId } = require("../untils/randomUntils");
const {
  displayExport,
  createExport,
  checkUniqueId,
  createExportDetails,
  displayDetail,
} = require("../services/CRUDExport");
const { displayRequest } = require("../services/CRUDService");
var moment = require("moment");

const getExportPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
  const limit = 10; // Số phần tử mỗi trang
  let { ex: listExport, totalItems } = await displayExport(page, limit);
  // console.log(ex);
  let employee = await displayEmployee();
  let department = await displayDepartment();
  let product = await displayProduct();
  let request = await displayRequest();

  let listDetail = {};
  for (let exportItem of listExport) {
    const details = await displayDetail(exportItem.name); // Gọi hàm displayDetail với tên phiếu xuất
    listDetail[exportItem.id] = details; // Sử dụng ID phiếu xuất làm key
  }
  const totalPages = Math.ceil(totalItems / limit);
  return res.render("warehouseExport.ejs", {
    activePage: "export",
    listEmployee: employee,
    listDepartment: department,
    listProduct: product,
    listRequest: request,
    listExport,
    moment,
    listDetail,
    currentPage: page,
    totalPages,
  });
};
const postCreateExport = async (req, res) => {
  let id;
  let isUnique = false;
  while (!isUnique) {
    id = generateRandomId();
    isUnique = await checkUniqueId(id);
  }
  const at = new Date();
  const create_at = moment(at).format("YYYY-MM-DD HH:mm:ss");
  const { name_producttb, quantity, name_export, department, name_employee } =
    req.body;
  await createExport(id, name_export, department, name_employee, create_at);
  await createExportDetails(name_export, name_producttb, quantity);

  res.redirect("back");
};
const postUpdateReq = async (req, res) => {
  const { id, status } = req.body;

  try {
    // Trường hợp id và status là một mảng (cập nhật hàng loạt)
    if (
      Array.isArray(id) &&
      Array.isArray(status) &&
      id.length === status.length
    ) {
      const promises = id.map((recordId, index) => {
        return connection.query(`UPDATE request SET status = ? WHERE id = ?`, [
          status[index],
          recordId,
        ]);
      });

      await Promise.all(promises);
    }

    // Trường hợp id và status là một đối tượng đơn lẻ
    if (typeof id === "string" && typeof status === "string") {
      await connection.query(`UPDATE request SET status = ? WHERE id = ?`, [
        status,
        id,
      ]);
    }

    // Nếu dữ liệu không đúng định dạng
    return res.status(400).json({ error: "Invalid data format" });
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

module.exports = {
  getExportPage,
  postCreateExport,
  postUpdateReq,
};
