var multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, "./src/public/assets/content/upload");
  },
  filename: (req, file, res) => {
    res(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const { generateRandomId } = require("../untils/randomUntils");
var moment = require("moment");

const {
  createProducts,
  displayProduct,
  displayCategory,
  deleteProduct,
  updateProduct,
  checkUniqueId,
} = require("../services/CRUDProduct");

const getProductPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
  const limit = 10; // Số phần tử mỗi trang
  let { products, totalItems } = await displayProduct(page, limit);
  const totalPages = Math.ceil(totalItems / limit);
  let category = await displayCategory();
  // Kiểm tra yêu cầu có phải trả về JSON không
  if (req.headers.accept.includes("application/json")) {
    return res.json({
      products,
    });
  }
  return res.render("product.ejs", {
    activePage: "product",
    listProduct: products,
    listCategories: category,
    currentPage: page,
    totalPages,
  });
};
const postCreateProduct = async (req, res) => {
  let id;
  let isUnique = false;
  while (!isUnique) {
    id = generateRandomId();
    isUnique = await checkUniqueId(id);
  }
  const image = req.files.image[0].filename;
  const at = new Date();
  const create_at = moment(at).format("YYYY-MM-DD HH:mm:ss");
  const { name, des, quantity, brand, color, size, category } = req.body;
  const parsedQuantity = parseInt(quantity);
  await createProducts(
    id,
    name,
    des,
    parsedQuantity,
    brand,
    color,
    size,
    category,
    image,
    create_at
  );
  res.redirect("back");
};
const postDeleteProduct = async (req, res) => {
  const id = req.body.id;
  await deleteProduct(id);
  res.redirect("back");
};
const postUpdateProduct = async (req, res) => {
  const image = req.files.image[0].filename;
  const { editProductId, name, des, brand, size, category, color, quantity } =
    req.body;
  await updateProduct(
    editProductId,
    name,
    des,
    brand,
    size,
    category,
    color,
    image,
    quantity
  );
  res.redirect("back");
};
module.exports = {
  getProductPage,
  postCreateProduct,
  upload,
  postDeleteProduct,
  postUpdateProduct,
};
