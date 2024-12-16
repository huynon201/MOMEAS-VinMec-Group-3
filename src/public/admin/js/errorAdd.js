document.addEventListener("DOMContentLoaded", function () {
  const createCategoryBtn = document.getElementById("createCategoryBtn");
  const addForm = document.getElementById("addform");
  const modalElement = document.getElementById("myModal");
  const modal = new bootstrap.Modal(modalElement);
  const categoryTableBody = document.getElementById("categoryTableBody");
  let stt = categoryTableBody.children.length + 1;
  async function handleAddCategory(event) {
    event.preventDefault();
    const formData = new FormData(addForm);
    const data = {
      name: formData.get("name"),
      des: formData.get("des"),
    };

    try {
      const response = await fetch("/admin/create-category", {
        method: "POST",
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

      // Hiển thị thông báo
      setTimeout(() => {
        alert.remove();
      }, 3000);

      // Nếu thêm thành công, cập nhật bảng
      if (result.status === "success") {
        const newRow = document.createElement("tr");
        const id = result.id;
        // Tạo dòng mới với thông tin từ API
        newRow.innerHTML = `
          <td>${stt}</td>
          <td>${id}</td>
          <td>${data.name}</td>
          <td>${data.des}</td>
          <td>
            <button class="btn btn-warning" 
            data-bs-toggle="modal"
            data-bs-target="#modalEdit"
            onclick="openEditModal('${id}', '${data.name}', '${data.des}')">Sửa
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
        categoryTableBody.appendChild(newRow);
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
        // Reset form và đóng modal
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
  createCategoryBtn.addEventListener("click", () => {
    addForm.addEventListener("submit", handleAddCategory);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const updateCategoryBtn = document.getElementById("updateCategoryBtn");
  const updateForm = document.getElementById("updateForm");
  const modalElement = document.getElementById("modalEdit");
  const modal = new bootstrap.Modal(modalElement);

  async function handleUpdateCategory(event) {
    event.preventDefault();
    const formData = new FormData(updateForm);
    const data = {
      editUserId: formData.get("editUserId"),
      name: formData.get("name"),
      des: formData.get("des"),
    };

    try {
      const response = await fetch("/admin/update-category", {
        method: "POST",
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

      // Hiển thị thông báo trong 3 giây
      setTimeout(() => {
        alert.remove();
      }, 3000);

      // Nếu update thành công, reset form và đóng modal
      if (result.status === "success") {
        const rowToUpdate = document.querySelector(
          `#categoryRow-${data.editUserId}`
        );
        if (rowToUpdate) {
          rowToUpdate.querySelector("td:nth-child(3)").textContent = data.name; // Cập nhật tên
          rowToUpdate.querySelector("td:nth-child(4)").textContent = data.des; // Cập nhật mô tả
        }
        updateForm.reset();
        modal.hide();
      }
    } catch (error) {
      console.error("Error during category update:", error);
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

  updateCategoryBtn.addEventListener("click", () => {
    updateForm.addEventListener("submit", handleUpdateCategory);
  });
});
