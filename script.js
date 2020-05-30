var popup = document.querySelector(".popup");
var openButton = document.querySelector(".profile__edit-button");
var closeButton = document.querySelector(".popup__close-icon");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

openButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
