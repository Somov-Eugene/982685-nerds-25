var link  = document.querySelector(".button-write");
var popup = document.querySelector(".modal-feedback");

var close = popup.querySelector(".modal-close");
var form  = popup.querySelector(".feedback-form");

var user  = form.querySelector(".msg-user");
var mail  = form.querySelector(".msg-mail");
var text  = form.querySelector(".msg-text");

var isStorageSupport = true;
var storageUser = "";
var storageMail = "";

try {
  storageUser = localStorage.getItem("user");
  storageMail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");

  if (storageUser) {
    user.value = storageUser;
    mail.focus();

    if (storageMail) {
      mail.value = storageMail;
      text.focus();
    } else {
      mail.focus();
    }
  } else {
    user.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!user.value || !mail.value || !text.value) {
    evt.preventDefault();

    // трясём окно
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");

    // ищем пустые поля и делаем их :invalid
    if (!user.value) user.setCustomValidity("Пустое поле!");
    if (!mail.value) mail.setCustomValidity("Пустое поле!");
    if (!text.value) text.setCustomValidity("Пустое поле!");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("user", user.value);
      localStorage.setItem("email", mail.value);
    }
  }
});

// при click в поле ввода убираем :invalid
user.addEventListener("click", function (evt) {
  user.setCustomValidity("");
});

mail.addEventListener("click", function (evt) {
  mail.setCustomValidity("");
});

text.addEventListener("click", function (evt) {
  text.setCustomValidity("");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    }
  }
});
