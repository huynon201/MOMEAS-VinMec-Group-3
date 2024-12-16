function initializeAutocomplete(inputClass, suggestionsClass) {
  // Lấy tất cả các phần tử input và suggestions theo class
  const inputs = document.querySelectorAll(`.${inputClass}`);
  const suggestionsLists = document.querySelectorAll(`.${suggestionsClass}`);
  console.log(inputs); // Kiểm tra danh sách các input
  console.log(suggestionsLists); // Kiểm tra danh sách các suggestions

  // Duyệt qua tất cả các cặp input và suggestions
  inputs.forEach((input, index) => {
    const suggestions = suggestionsLists[index]; // Lấy danh sách gợi ý tương ứng

    // Kiểm tra nếu suggestions tồn tại
    if (!suggestions) {
      console.error(`Suggestions không tồn tại cho input tại index ${index}`);
      return;
    }

    // Gắn sự kiện focus cho input
    input.onfocus = function () {
      suggestions.style.display = "block";
      suggestions.style.width = `${input.offsetWidth}px`; // Căn chỉnh chiều rộng với input
    };

    // Gắn sự kiện input
    input.oninput = function () {
      const text = input.value.toUpperCase();
      let hasResults = false;
      for (let item of suggestions.children) {
        if (item.textContent.toUpperCase().indexOf(text) > -1) {
          item.style.display = "block";
          hasResults = true;
        } else {
          item.style.display = "none";
        }
      }
      suggestions.style.display = hasResults ? "block" : "none";
    };

    // Gắn sự kiện click cho từng item trong danh sách gợi ý
    for (let item of suggestions.children) {
      item.onclick = function () {
        input.value = item.textContent;
        suggestions.style.display = "none";
      };
    }
  });

  // Đóng danh sách khi nhấp ra ngoài
  document.addEventListener("click", function (e) {
    inputs.forEach((input, index) => {
      const fieldset = input.closest("fieldset");
      const suggestions = suggestionsLists[index];
      if (fieldset && !fieldset.contains(e.target)) {
        suggestions.style.display = "none";
      }
    });
  });
}
function addNewRow() {
  // Thêm hàng vào bảng
  render_xuat();

  // Chờ một chút để các phần tử mới được thêm vào DOM
  setTimeout(() => {
    // Khởi tạo autocomplete lại cho các phần tử mới
    initializeAutocomplete("producttb", "suggestionProduct");
  }, 100);
}
