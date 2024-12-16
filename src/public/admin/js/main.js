const sidebar = document.querySelector(".sidebar");
const sidebarOpenBtn = document.querySelector("#sidebar-open");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");
const columContent = document.querySelector(".colum-content");

// Function to handle window resize
const handleResize = () => {
  if (window.innerWidth < 800) {
    sidebar.classList.add("close");
    sidebar.classList.remove("locked");
    sidebar.classList.remove("hoverable");
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  } else {
    sidebar.classList.remove("close");
    sidebar.classList.add("locked");
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
    if (!sidebar.classList.contains("locked")) {
      sidebar.classList.add("hoverable");
      sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    } else {
      sidebar.classList.remove("hoverable");
      sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    }
  }
};

window.addEventListener("resize", handleResize);

//erorr

// Function to toggle the lock state of the sidebar
const toggleLock = () => {
  sidebar.classList.toggle("locked");
  if (!sidebar.classList.contains("locked")) {
    sidebar.classList.add("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  } else {
    sidebar.classList.remove("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
  }
};

// Function to hide the sidebar when the mouse leaves
const hideSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  }
};

// Function to show the sidebar when the mouse enters
const showSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
  }
};

// Function to toggle the sidebar
const toggleSidebar = () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  } else {
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
  }
};

// Adding event listeners to buttons and sidebar for the corresponding actions
sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);

handleResize();
// Spinner
var spinner = function () {
  setTimeout(function () {
    if ($("#spinner").length > 0) {
      $("#spinner").removeClass("show");
    }
  }, 1);
};
spinner(0);
// // Khởi tạo các sự kiện khi nhấn nút xóa
// attachDeleteListeners();
function attachDeleteListeners() {
  document.querySelectorAll(".xoa").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      // Lấy ID của danh mục từ nút xóa
      const categoryId = button.getAttribute("data-id");
      const popoverContent = document
        .getElementById(`confirmDelete-${categoryId}`)
        .cloneNode(true);
      popoverContent.classList.remove("d-none");

      // Thêm popover content vào body
      document.body.appendChild(popoverContent);

      // Tạo popover cho nút "Xóa" được nhấn
      const popover = new bootstrap.Popover(button, {
        content: popoverContent,
        html: true,
        placement: "top",
        trigger: "manual",
      });

      popover.show();

      // Xử lý khi nhấn nút "Hủy" để đóng popover
      popoverContent
        .querySelector(".cancel")
        .addEventListener("click", function () {
          popoverContent.remove();
          popover.dispose();
        });

      // Xử lý khi nhấn nút "Có" để thực hiện xóa
      popoverContent
        .querySelector("form")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          // Gửi form để xóa mục tương ứng
          this.submit();
          popoverContent.remove();
          popover.dispose();
        });
    });
  });
}

// Gọi hàm sau khi DOM tải xong
document.addEventListener("DOMContentLoaded", attachDeleteListeners);

// hiển thị thông tin vào modal edit category
function openEditModal(id, name, description) {
  document.getElementById("editUserId").value = id;
  document.getElementById("nameEdit").value = name;
  document.getElementById("desEdit").value = description;
}
// hiển thị thông tin vào modal edit product
function EditModalProduct(
  id,
  name,
  description,
  quantity,
  brand,
  color,
  size,
  category_name,
  image
) {
  const basePath = "/assets/content/upload/";
  document.getElementById("editProductId").value = id;
  document.getElementById("nameEdit").value = name;
  document.getElementById("desEdit").value = description;
  document.getElementById("brandEdit").value = brand;
  document.getElementById("sizeEdit").value = size;
  document.getElementById("modalEditElement").value = category_name;
  document.getElementById("colorEdit").value = color;
  document.getElementById("quantityEdit").value = quantity;
  document.getElementById("avatarPreviewEdit").src = basePath + image;
}
function openEditEmployee(id, name, department, role, phone, address, image) {
  const basePath = "/assets/content/upload/";
  document.getElementById("editemployeeId").value = id;
  document.getElementById("nameEdit").value = name;
  document.getElementById("modalEditElement").value = department;
  document.getElementById("regencyEdit").value = role;
  document.getElementById("phoneNumberEdit").value = phone;
  document.getElementById("addressEdit").value = address;
  document.getElementById("avatarPreviewEdit").src = basePath + image;
}
function openEditAccount(id, name, account, password, role) {
  document.getElementById("editAccountId").value = id;
  document.getElementById("modalEditElement").value = name;
  document.getElementById("nameEdit").value = account;
  document.getElementById("passwordEdit").value = password;
  document.getElementById("roleEdit").value = role;
}
