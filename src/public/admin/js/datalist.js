function initializeAutocomplete(inputId, suggestionsId) {
  const input = document.getElementById(inputId);
  const suggestions = document.getElementById(suggestionsId);

  input.onfocus = function () {
    suggestions.style.display = "block";
    suggestions.style.width = `${input.offsetWidth}px`; // Căn chỉnh chiều rộng với input
  };

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

  // Xử lý khi người dùng nhấp vào mục trong danh sách
  for (let item of suggestions.children) {
    item.onclick = function () {
      input.value = item.textContent;
      suggestions.style.display = "none";
    };
  }

  // Đóng danh sách khi nhấp ra ngoài
  document.addEventListener("click", function (e) {
    const fieldset = input.closest("fieldset"); // Tìm fieldset gần nhất với input
    if (fieldset && !fieldset.contains(e.target)) {
      suggestions.style.display = "none";
    }
  });
}

// Khởi tạo autocomplete cho các trường modal
initializeAutocomplete("modalAdd", "suggestionAdd");
initializeAutocomplete("role", "suggestionRole");
initializeAutocomplete("modalEditElement", "suggestionEdit");
initializeAutocomplete("roleEdit", "suggestionRoleEdit");
// initializeAutocomplete("producttb", "suggestionProduct");
