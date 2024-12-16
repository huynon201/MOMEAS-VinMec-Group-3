document.addEventListener("DOMContentLoaded", function () {
  const createBtn = document.getElementById("createBtn");
  const addForm = document.getElementById("addform");
  const modalElement = document.getElementById("myModal");
  const modal = new bootstrap.Modal(modalElement);
  const TableBody = document.getElementById("TableBody");
  const errorMessage = document.getElementById("errorMessage");

  async function handleAdd(event) {
    event.preventDefault();
    const formData = new FormData(addForm);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const username = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const usernameRegex = /^(?=.*[A-Z])[A-Za-z\d]+$/; // Ít nhất 1 chữ cái viết hoa
    const passwordRegex = /^.{8,}$/; // Ít nhất 8 ký tự
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
      try {
        const response = await fetch("/admin/create-account", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        const alertContainer = document.getElementById("alert-container");
        alertContainer.innerHTML = ""; // Xóa thông báo cũ
        const alert = document.createElement("div");
        alert.className = `alert alert-${
          result.status === "success" ? "success" : "danger"
        }`;
        alert.textContent = result.message;
        alertContainer.appendChild(alert);
        setTimeout(() => {
          alert.remove();
        }, 3000);

        if (result.status === "success") {
          let stt = TableBody.children.length + 1;

          const newRow = document.createElement("tr");
          const id = result.id;

          newRow.innerHTML = `
          <td>${stt}</td>
          <td>${id}</td>
          <td>${data.name_employee}</td>
          <td>${data.name_account}</td>
          <td>${data.password}</td>
          <td>${data.role}</td>
          <td>
            <button class="btn btn-warning" 
            data-bs-toggle="modal"
            data-bs-target="#modalEdit"
            onclick="openEditModal('${id}', '${data.name_employee}', '${data.name_account}')">Sửa
            </button>
            <button class="btn btn-danger xoa" data-id=${id}>Xóa</button>
    <div
                    id="confirmDelete-${id}"
                    class="popover-content d-none">
                    <div class="popover-heading">
                      <i
                        style="
                          color: orange;
                          font-size: 20px;
                          margin-right: 5px;
                        "
                        class="bx bxs-error bx-flashing"></i>
                      <span>Bạn có muốn xóa không?</span>
                    </div>
                    <div class="popover-body">
                      <button class="btn btn-outline-primary btn-sm cancel">
                        Hủy
                      </button>
                      <form
                        action="/admin/delete-category"
                        method="POST"
                        style="display: inline">
                        <input
                          type="hidden"
                          name="id"
                          value="${id}" />
                        <button
                          type="submit"
                          class="btn btn-outline-danger btn-sm">
                          Có
                        </button>
                      </form>
                    </div>
                  </div>
          </td>
          `;
          TableBody.appendChild(newRow);
          const deleteButton = newRow.querySelector(".xoa");
          deleteButton.addEventListener("click", () => {
            const confirmDelete = document.getElementById(
              `confirmDelete-${deleteButton.dataset.id}`
            );
            if (confirmDelete) {
              confirmDelete.classList.toggle("d-none");
            }
          });
          stt++;
          addForm.reset();
          modal.hide();
        }
      } catch (error) {
        console.error("Error during adding category:", error);
        modal.hide();
        setTimeout(() => {
          alert.remove();
        }, 3000);
        const alertContainer = document.getElementById("alert-container");
        alertContainer.innerHTML = "";
        const alert = document.createElement("div");
        alert.className = "alert alert-danger";
        alert.textContent = "Đã xảy ra lỗi. Vui lòng thử lại sau.";
        alertContainer.appendChild(alert);
      }
    }
  }
  createBtn.addEventListener("click", () => {
    addForm.addEventListener("submit", handleAdd);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const createBtn = document.getElementById("updateBtn");
  const updateForm = document.getElementById("updateForm");
  const modalElement = document.getElementById("modalEdit");
  const modal = new bootstrap.Modal(modalElement);
  const errorMessage = document.getElementById("errorMessagee");

  async function handleUpdate(event) {
    event.preventDefault();
    const formData = new FormData(updateForm);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const username = document.getElementById("nameEdit").value;
    const password = document.getElementById("passwordEdit").value;
    const usernameRegex = /^(?=.*[A-Z])[A-Za-z\d]+$/; // Ít nhất 1 chữ cái viết hoa
    const passwordRegex = /^.{8,}$/; // Ít nhất 8 ký tự
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
      try {
        const response = await fetch("/admin/update-account", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        const alertContainer = document.getElementById("alert-container");
        alertContainer.innerHTML = ""; // Xóa thông báo cũ
        const alert = document.createElement("div");
        alert.className = `alert alert-${
          result.status === "success" ? "success" : "danger"
        }`;
        alert.textContent = result.message;
        alertContainer.appendChild(alert);
        setTimeout(() => {
          alert.remove();
        }, 3000);

        if (result.status === "success") {
          const rowToUpdate = document.querySelector(
            `#Row-${data.editAccountId}`
          );
          if (rowToUpdate) {
            rowToUpdate.querySelector("td:nth-child(3)").textContent =
              data.name_employee; // Cập nhật tên
            rowToUpdate.querySelector("td:nth-child(4)").textContent =
              data.name_account;
            rowToUpdate.querySelector("td:nth-child(5)").textContent = data.pwd;
            rowToUpdate.querySelector("td:nth-child(6)").textContent =
              data.role; // Cập nhật mô tả
          }
          updateForm.reset();
          modal.hide();
        }
      } catch (error) {
        console.error("Error during adding category:", error);
        modal.hide();
        setTimeout(() => {
          alert.remove();
        }, 3000);
        const alertContainer = document.getElementById("alert-container");
        alertContainer.innerHTML = "";
        const alert = document.createElement("div");
        alert.className = "alert alert-danger";
        alert.textContent = "Đã xảy ra lỗi. Vui lòng thử lại sau.";
        alertContainer.appendChild(alert);
      }
    }
  }
  createBtn.addEventListener("click", () => {
    updateForm.addEventListener("submit", handleUpdate);
  });
});
