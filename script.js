const popup = document.querySelector(".popup");
const openButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__user-name");
const profileTitle = document.querySelector(".profile__user-about");
const formElement = document.querySelector(".popup__container");
const nameInput = document.querySelector(".popup__field_type_name");
const jobInput = document.querySelector(".popup__field_type_title");

function togglePopup() {
  popup.classList.toggle("popup_opened");
  console.log("clicked");
}

openButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
  
  togglePopup();
})


