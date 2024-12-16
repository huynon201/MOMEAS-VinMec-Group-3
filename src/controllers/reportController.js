const { getExports, getImports } = require("../services/callReport");
const { displayExport, displayDetail } = require("../services/CRUDExport");
const moment = require("moment");

const getReportPage = async (req, res) => {
  return res.render("report.ejs", {
    activePage: "report",
    reportData: [], // Truyền danh sách rỗng
    moment, // Để đảm bảo moment không bị lỗi
  });
};

const getExIm = async (req, res) => {
  const { startDate, endDate } = req.body;
  const start = moment(startDate, "DD/MM/YYYY").format("YYYY-MM-DD 00:00:00");
  const end = moment(endDate, "DD/MM/YYYY").format("YYYY-MM-DD 23:59:59");

  const exports = await getExports(start, end);
  const imports = await getImports(start, end);

  const reportDatas = [...exports, ...imports];
  // Gộp dữ liệu xuất và nhập
  const reportData = [...exports, ...imports].map((item, index) => ({
    stt: index + 1,
    maPhieu: item.exportName || item.importName,
    tenVatTu: item.productName,
    soLuongNhap: item.importName ? item.quantity : 0,
    soLuongXuat: item.exportName ? item.quantity : 0,
    ngay: item.created_at,
  }));
  console.log("reportData :>> ", reportDatas);
  res.render("report.ejs", {
    activePage: "report",
    reportData,
    moment,
  });
};
module.exports = {
  getReportPage,
  getExIm,
};
