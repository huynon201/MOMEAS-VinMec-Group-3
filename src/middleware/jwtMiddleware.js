require("dotenv").config();
// const { expressjwt: jwt } = require("express-jwt");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
// Xác thực JWT
const authenticateJWT = (req, res, next) => {
  // Lấy token từ cookie (hoặc header)
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.redirect("/");
    // return res.status(403).json({ message: "No token provided" });
  }

  // Xác minh token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Gán thông tin giải mã vào req.user
    req.user = decoded;
    next(); // Tiếp tục với các middleware hoặc route handler tiếp theo
  });
};

// Middleware kiểm tra quyền admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    return next(); // Tiếp tục nếu là admin
  }
  return res.status(403).json({ message: "Forbidden. Admin only." });
};

// Middleware kiểm tra quyền user
const authorizeUser = (req, res, next) => {
  if (req.user && req.user.role == "user") {
    return next(); // Tiếp tục nếu là user
  }
  return res.status(403).json({ message: "Forbidden. User only." });
};

module.exports = { authenticateJWT, authorizeAdmin, authorizeUser };
