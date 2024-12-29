const avatarMiddleware = (req, res, next) => {
  const information = req.cookies.information
    ? JSON.parse(req.cookies.information)
    : null;

  res.locals.avatar = information?.image || "default.jpg"; // Gán giá trị cookie hoặc ảnh mặc định
  res.locals.name = information?.name_employee || "Khách";
  res.locals.role = information?.role || "khách";

  next();
};
module.exports = avatarMiddleware;
