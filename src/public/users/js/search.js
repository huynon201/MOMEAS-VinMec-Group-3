// Lấy các phần tử cần thiết
const searchBox = document.getElementById("search-box");
const tableRows = document.querySelectorAll(".trow");
const cards = document.querySelectorAll(".card");

// Lắng nghe sự kiện nhập liệu
searchBox.addEventListener("input", () => {
  const searchValue = searchBox.value.toLowerCase(); // Giá trị người dùng nhập vào (chuyển thành chữ thường)

  // Lặp qua tất cả các dòng trong bảng
  tableRows.forEach((row) => {
    const categoryName = row.children[2].textContent.toLowerCase(); // Tên danh mục (cột thứ 3)
    if (categoryName.includes(searchValue)) {
      row.style.display = ""; // Hiển thị nếu khớp
    } else {
      row.style.display = "none"; // Ẩn nếu không khớp
    }
  });

  cards.forEach((card) => {
    const name = card.children[1].textContent.toLowerCase(); // Lấy tên sản phẩm từ dataset

    if (name.includes(searchValue)) {
      card.style.display = ""; // Hiển thị nếu khớp
    } else {
      card.style.display = "none"; // Ẩn nếu không khớp
    }
  });
});
// kkkkk
