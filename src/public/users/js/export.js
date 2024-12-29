function render_xuat() {
  const tablebody = document.querySelector("#render-xuat tbody");

  // Kiểm tra `tablebody` có tồn tại không
  if (!tablebody) {
    console.error("Element #render-xuat tbody không tồn tại!");
    return;
  }

  // Gửi yêu cầu AJAX đến API để lấy danh sách sản phẩm
  fetch("/user/", {
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    })
    .then((data) => {
      const listProduct = data.products;
      // Tạo hàng mới
      const row = document.createElement("tr");

      let productOptions = ""; // Biến lưu kết quả
      listProduct.forEach(function (product) {
        // Chỉ hiển thị sản phẩm có số lượng > 0
        if (product.quantity > 0) {
          productOptions += `<li data-id="${product.id}" data-quantity="${product.quantity}">${product.name}</li>`;
        }
      });

      row.innerHTML = `
            <td>
            <fieldset>
              <input
                type="search"
                class="form-control producttb"
                name="name_producttb"
                placeholder="Chọn vật tư"
                required
              />
              <ul class="suggestions suggestionProduct">
                ${productOptions}
              </ul>
              </fieldset>
            </td>
            <td>
              <input id="so-luong-output" class="form-control" type="number" value="1" min="1" name="quantity">
            </td>
            <td>
              <button class="delete-btn btn btn-danger btn-sm">Xóa</button>
            </td>
          `;

      // Thêm hàng mới vào bảng
      tablebody.appendChild(row);

      // Xử lý sự kiện khi nhấn nút "Xóa"
      row.querySelector(".delete-btn").addEventListener("click", () => {
        tablebody.removeChild(row);
      });

      // Xử lý sự kiện khi chọn sản phẩm
      const inputSearch = row.querySelector(".producttb");
      const suggestionList = row.querySelector(".suggestionProduct");
      const quantityInput = row.querySelector("#so-luong-output");

      suggestionList.addEventListener("click", (event) => {
        const selectedItem = event.target;
        if (selectedItem.tagName === "LI") {
          const selectedProduct = selectedItem.textContent;
          const stock = selectedItem.getAttribute("data-quantity");

          // Cập nhật giá trị ô tìm kiếm với tên sản phẩm đã chọn
          inputSearch.value = selectedProduct;

          // Đặt giá trị `max` cho ô số lượng
          quantityInput.max = stock;
          quantityInput.value = Math.min(quantityInput.value, stock);

          // Ẩn danh sách gợi ý
          suggestionList.style.display = "none";
        }
      });

      // Hiển thị lại danh sách khi người dùng nhập
      inputSearch.addEventListener("input", () => {
        suggestionList.style.display = "block";
      });

      // Ràng buộc giá trị trong ô nhập không vượt quá `max`
      quantityInput.addEventListener("input", () => {
        const max = parseInt(quantityInput.max, 10);
        const value = parseInt(quantityInput.value, 10);

        if (value > max) {
          quantityInput.value = max; // Đặt lại giá trị về max nếu vượt quá
        } else if (value < 1) {
          quantityInput.value = 1; // Đảm bảo giá trị không nhỏ hơn `min`
        }
      });
    })
    .catch((error) => console.error("Error loading products:", error));
}
