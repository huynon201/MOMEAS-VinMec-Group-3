$(document).ready(() => {
  const avatarFile = $("#image"); // Input file chính
  const avatarFileEdit = $("#imageEdit"); // Input file trong modal Edit
  let lastSelectedImage = null; // Lưu file ảnh đã chọn

  // Khi người dùng chọn ảnh (input chính)
  avatarFile.change(function (e) {
    lastSelectedImage = e.target.files[0]; // Lưu file ảnh được chọn
    const imgURL = URL.createObjectURL(lastSelectedImage);
    $("#avatarPreview").attr("src", imgURL);
    $("#avatarPreview").css({ display: "block" });
  });

  // Khi người dùng chọn ảnh (trong modal Edit)
  const avatarPreviewEdit = $("#avatarPreviewEdit");

  avatarFileEdit.change(function (e) {
    lastSelectedImage = e.target.files[0]; // Cập nhật file ảnh trong modal Edit
    const imgURL = URL.createObjectURL(lastSelectedImage);
    avatarPreviewEdit.attr("src", imgURL);
    avatarPreviewEdit.css({ display: "block" });
  });

  // Theo dõi khi modal mở (body có class modal-open)
  const body = $("body");

  $("#modalEdit").on("shown.bs.modal", function () {
    if (body.hasClass("modal-open")) {
      if (avatarPreviewEdit.css("display") === "none") {
        avatarPreviewEdit.css({ display: "block" });
      }
    }
  }); // Kiểm tra mỗi 100ms
});
$(document).ready(() => {
  const avatarFileEdit = $("#imageEdit"); // Input file
  const avatarFile = $("#image"); // Input file

  const fileNameDisplay = $(".fileNameDisplay"); // Phần tử hiển thị tên file
  avatarFile.change(function (e) {
    const files = e.target.files; // Lấy danh sách file
    if (files.length > 0) {
      const fileName = files[0].name; // Lấy tên file đầu tiên
      fileNameDisplay.text(`Tên file đã chọn: ${fileName}`); // Hiển thị tên file
    } else {
      fileNameDisplay.text("Chưa có file nào được chọn."); // Thông báo nếu chưa chọn file
    }
  });
  // Lắng nghe sự kiện thay đổi
  avatarFileEdit.change(function (e) {
    const files = e.target.files; // Lấy danh sách file
    if (files.length > 0) {
      const fileName = files[0].name; // Lấy tên file đầu tiên
      fileNameDisplay.text(`Tên file đã chọn: ${fileName}`); // Hiển thị tên file
    } else {
      fileNameDisplay.text("Chưa có file nào được chọn."); // Thông báo nếu chưa chọn file
    }
  });
});
