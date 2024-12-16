document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");
  const modalElement = document.getElementById("modalId");
  const modal = new bootstrap.Modal(modalElement);

  // Xử lý gửi form bằng AJAX
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Lấy dữ liệu từ form
    const formData = new FormData(loginForm);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const usernameRegex = /^(?=.*[A-Z])[A-Za-z\d]+$/; // Ít nhất 1 chữ cái viết hoa
    const passwordRegex = /^.{8,}$/; // Ít nhất 8 ký tự
    try {
      // Gửi yêu cầu đăng nhập bằng fetch
      const response = await fetch("/login-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (username === "" || password === "") {
        errorMessage.textContent =
          "Tên đăng nhập và mật khẩu không được để trống!";
        return;
      }
      if (!usernameRegex.test(username)) {
        errorMessage.textContent =
          "Tên tài khoản phải bao gồm chữ và số, và ít nhất 1 chữ cái viết hoa.";
        errorMessage.style.display = "block";
        isValid = false;
      } else if (!passwordRegex.test(password)) {
        errorMessage.textContent = "Mật khẩu phải có ít nhất 8 ký tự.";
        errorMessage.style.display = "block";
        isValid = false;
      } else {
        if (result.success) {
          // Đăng nhập thành công, chuyển hướng
          window.location.href = result.redirect;
        } else {
          // Hiển thị thông báo lỗi
          if (result.message === "wrongpassword") {
            errorMessage.textContent = "Mật khẩu không đúng. Vui lòng thử lại.";
          } else if (result.message === "usernotfound") {
            errorMessage.textContent = "Người dùng không tồn tại.";
          } else {
            errorMessage.textContent = "Đã xảy ra lỗi. Vui lòng thử lại sau.";
          }
          modal.show(); // Hiển thị modal
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      errorMessage.textContent = "Đã xảy ra lỗi. Vui lòng thử lại sau.";
      modal.show(); // Hiển thị modal
    }
  });
});
