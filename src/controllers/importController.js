const { displayProduct } = require("../services/CRUDProduct");
const { generateRandomId } = require("../untils/randomUntils");
const {
  displayImport,
  displayDetail,
  checkUniqueId,
  createImport,
  createImportDetails,
} = require("../services/CRUDImport");
var moment = require("moment");

const getImportPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
  const limit = 10; // Số phần tử mỗi trang
  let { im: listImport, totalItems } = await displayImport(page, limit);
  let product = await displayProduct();

  let listDetail = {};
  for (let importItem of listImport) {
    const details = await displayDetail(importItem.name); // Gọi hàm displayDetail với tên phiếu xuất
    listDetail[importItem.id] = details; // Sử dụng ID phiếu xuất làm key
  }
  const totalPages = Math.ceil(totalItems / limit);
  return res.render("warehouseImport.ejs", {
    activePage: "import",
    listProduct: product,
    listImport,
    moment,
    listDetail,
    currentPage: page,
    totalPages,
  });
};

const postCreateImport = async (req, res) => {
  let id;
  let isUnique = false;
  while (!isUnique) {
    id = generateRandomId();
    isUnique = await checkUniqueId(id);
  }
  const at = new Date();
  const create_at = moment(at).format("YYYY-MM-DD HH:mm:ss");

  const { name_producttb, quantity, name_import } = req.body;
  console.log("req.body :>> ", req.body);
  await createImport(id, name_import, create_at);
  await createImportDetails(name_import, name_producttb, quantity);

  res.redirect("back");
};
module.exports = {
  getImportPage,
  postCreateImport,
};
