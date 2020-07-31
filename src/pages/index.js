import FormValidator from '../scripts/FormValidator.js';
import Card from '../scripts/Card.js';
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo";
import "./index.css";


// Form definitions
const defaultConfig = {
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_visible"
};

// FORM VARIABLES
// Profile variables 
const profilePopup = document.querySelector(".popup_type_edit-profile");
const editButton = document.querySelector(".profile__edit-button");
const editProfileForm = profilePopup.querySelector('.popup__form');
const nameInput = document.querySelector(".profile__user-name");
const jobInput = document.querySelector(".profile__user-about");

// Add card form variables
const cardPopup = document.querySelector(".popup_type_add-card");
const addButton = document.querySelector(".profile__add-button");
const addCardForm = cardPopup.querySelector('.popup__form');

// Form Validator variables
const editProfileValidation = new FormValidator(defaultConfig, editProfileForm);
const addCardValidation = new FormValidator(defaultConfig, addCardForm);



// IMAGE CARD VARIABLES
// Image section
const imageContainer = document.querySelector(".photo-grid");
const cardTemplateSelector = ".card-template";

// Image popup
const imagePopup = document.querySelector(".popup_type_display-image");

// Initial card data
const initialCards = [
  {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
      name: "Vanois National Park",
      link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];



// IMAGE CARDS
// Creates new image popup and sets event listeners
const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();

// Function opening card when clicked
const handleCardClick = (card) => {
  popupWithImage.open(card);
};

// Creates section for images
const imageList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, cardTemplateSelector, handleCardClick);
    const cardElement = card.generateCard();
    imageList.addItem(cardElement);
    }
  },
  imageContainer
);

// Creates initial image list
imageList.renderElements();



// ADD IMAGE FORM
// Creates image form and adds event listener to add button
const newCardForm = new PopupWithForm(cardPopup, (data) => {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  imageList.addItem(card.generateCard());
});
addButton.addEventListener("click", () => {
  newCardForm.open();
});

// Sets event listeners to open form
newCardForm.setEventListeners();

// Calls FormValidator for add card form
addCardValidation.enableValidation();



// PROFILE FORM
// Declares profile with UserInfo class
const profile = new UserInfo(nameInput, jobInput);

// Creates profile form and adds event listener to edit button
const profileForm = new PopupWithForm(profilePopup, (data) => {
  profile.setUserInfo(data);
});
editButton.addEventListener("click", () => {
  const user = profile.getUserInfo();
  nameInput.value = user.name;
  jobInput.value = user.title;
  profileForm.open();
});

// Sets event listeners to open form
profileForm.setEventListeners();

// Calls FormValidator for profile form
editProfileValidation.enableValidation();