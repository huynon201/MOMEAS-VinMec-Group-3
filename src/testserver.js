const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

app.get("/error", (req, res, next) => {
  next(new Error("This is a sample error!"));
});

// Middleware bắt lỗi 404
app.use((req, res, next) => {
  res.status(404).json({
    error: true,
    message: "Route not found",
  });
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
