require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const { router, adminRouter, userRouter } = require("./routes/web");
const configViewEngine = require("./configs/viewEngine");
const {
  authenticateJWT,
  authorizeAdmin,
  authorizeUser,
} = require("./middleware/jwtMiddleware");
// req.body

const avatarMiddleware = require("./middleware/avatarMiddleware");
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Sử dụng cookie-parser để đọc cookie
configViewEngine(app);

const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

app.use(avatarMiddleware);

app.use("/admin", authenticateJWT, authorizeAdmin, adminRouter);
app.use("/user", authenticateJWT, authorizeUser, userRouter);

app.use("/", router);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
