require("dotenv").config();
const { findUserByUserName } = require("../services/userModel");
const { getUserAvatar } = require("../services/CRUDEmployee");
// const { updatePassword } = require("./updatepassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUserName(username);

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign(
          { name: user.name_account, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        const userid = user.name_employee;
        const information = await getUserAvatar(userid);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.cookie("information", JSON.stringify(information));

        return res.status(200).json({
          success: true,
          redirect: user.role === "admin" ? "/admin" : "/user",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "wrongpassword",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "usernotfound",
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "internalservererror",
    });
  }
};
const getLoginPage = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.cookie("information", "");
  res.clearCookie("token");
  res.clearCookie("information");
  res.locals.avatar = "default.jpg";

  return res.render("login.ejs");
};

module.exports = {
  login,
  getLoginPage,
};
