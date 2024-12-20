require("dotenv").config();
const session = require("express-session");

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "default_secret_key", // Sử dụng secret từ env hoặc default
  resave: false, // Không lưu lại session nếu không thay đổi
  saveUninitialized: false, // Không lưu session mới nếu chưa có gì thay đổi
  cookie: { secure: false, maxAge: 1000000 }, // Tùy chỉnh cookie nếu cần (1 giờ)
});

module.exports = sessionMiddleware;
