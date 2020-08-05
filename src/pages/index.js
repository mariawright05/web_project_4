import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";
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
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-3",
  headers: {
    authorization: "5707ddd2-2e4a-4b11-a4a0-b8d42848d184",
    "Content-Type": "application/json"
  }
});

api.getCardList()
.then(res => {
  const imageList = new Section({
    items: res,
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

  const newCardForm = new PopupWithForm(cardPopup, (data) => {

    api.addCard(data);
  
    //change name from html
    const card = new Card({link: data.url, name: data.title}, cardTemplateSelector, handleCardClick);
    imageList.addItem(card.generateCard());
  });

  addButton.addEventListener("click", () => {
    newCardForm.open();
  });

  // Sets event listeners to open form
  newCardForm.setEventListeners();

  // Calls FormValidator for add card form
  addCardValidation.enableValidation();
})

// Declares profile with UserInfo class
const profile = new UserInfo(nameInput, jobInput);

api.getUserInfo()
  .then(res => {
    profile.setUserInfo({ name: res.name, title: res.about });
  })








// ADD IMAGE FORM
// Creates image form and adds event listener to add button
// const newCardForm = new PopupWithForm(cardPopup, (data) => {

//   api.addCard(data);

//   //change name from html
//   const card = new Card({link: data.url, name: data.title}, cardTemplateSelector, handleCardClick);
//   imageList.addItem(card.generateCard());
// });
// addButton.addEventListener("click", () => {
//   newCardForm.open();
// });

// // Sets event listeners to open form
// newCardForm.setEventListeners();

// // Calls FormValidator for add card form
// addCardValidation.enableValidation();



// PROFILE FORM


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