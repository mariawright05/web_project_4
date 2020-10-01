import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";
import "./index.css";
import { name } from 'file-loader';

// FORM VARIABLES
// Profile variables 
const profilePopup = document.querySelector(".popup_type_edit-profile");
const editButton = document.querySelector(".profile__edit-button");
const editProfileForm = profilePopup.querySelector(".popup__form");
const nameInput = document.querySelector(".profile__user-name");
const jobInput = document.querySelector(".profile__user-about");


// Avatar variables
const avatarPopup = document.querySelector(".popup_type_edit-avatar");
const editAvatarButton = document.querySelector(".profile__user-avatar_overlay");
const editAvatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = document.querySelector(".profile__user-avatar")

// Add card form variables
const cardPopup = document.querySelector(".popup_type_add-card");
const addButton = document.querySelector(".profile__add-button");
const addCardForm = cardPopup.querySelector('.popup__form');
const url = addCardForm.querySelector('.popup__field_type_url');
const title = addCardForm.querySelector('.popup__field_type_card-title');

// Form definitions
const defaultConfig = {
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_visible"
};

// Form Validator variables
const editProfileValidation = new FormValidator(defaultConfig, editProfileForm);
const addCardValidation = new FormValidator(defaultConfig, addCardForm);
const avatarCardValidation = new FormValidator(defaultConfig, editAvatarForm);




// IMAGE CARD VARIABLES
// Image section
const imageContainer = document.querySelector(".photo-grid");
const cardTemplateSelector = ".card-template";

// Image popup
const imagePopup = document.querySelector(".popup_type_display-image");


// INIT API CLASS AND ADD USER GROUP AND AUTH TOKEN
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5",
  headers: {
    authorization: "095d2fb7-24e6-4afa-94ea-68b60bd7e290",
    "Content-Type": "application/json"
  }
});

// IMAGE CARDS
// Get initial card list
api.getCardList()
.then(res => {
  const currentUser = nameInput.textContent;
  const imageList = new Section({
    items: res,
    renderer: (data) => {
      const card = new Card({
        data, 
        handleCardClick, 
        handleDeleteClick: ((cardID) => {api.removeCard(cardID)})}, 
        currentUser,
        cardTemplateSelector
      );
      const cardElement = card.generateCard();
      imageList.addItem(cardElement);
    }
  },
  imageContainer);

  // Render initial cards
  imageList.renderElements();


  // Open new card form
  const newCardForm = new PopupWithForm(cardPopup, (data) => {

    // Create new card from form and add to the list
    api.addCard(data);

    const card = new Card({
      data: {link: url.value, name: title.value, owner: owner.name}, 
      handleCardClick,
      handleDeleteClick: ((cardId) => {api.removeCard(cardId)}),
      userName},
      cardTemplateSelector
    );
    imageList.addItem(card.generateCard());

  });


  // Add event listener for add card button and open form upon click
  addButton.addEventListener("click", () => {
    newCardForm.open();
  });

  // Set event listeners to open form
  newCardForm.setEventListeners();

  // Call FormValidator for add card form
  addCardValidation.enableValidation();
})

// Create new image popup and set card event listeners
const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();

// Open card on click
const handleCardClick = (card) => {
  popupWithImage.open(card);
};


// PROFILE & AVATAR FORMS
// Get profile from server
api.getUserInfo()
.then(res => {
  // Declare profile with UserInfo class
  const profile = new UserInfo(nameInput, jobInput, avatarInput);
  profile.setUserTextInfo({ name:res.name, title:res.about });
  profile.setUserAvatarInfo({ avatar:res.avatar });

  // Create profile form and add event listener to edit button
  const profileForm = new PopupWithForm(profilePopup, (data) => {
    api.setUserInfo(data);
    profile.setUserTextInfo(data);
  });
    
  editButton.addEventListener("click", () => {
    const user = profile.getUserTextInfo();
    nameInput.value = user.name;
    jobInput.value = user.title;
    profileForm.open();
  });

  // Create avatar form and add event listener to editAvatarButton
  const avatarForm = new PopupWithForm(avatarPopup, (res) => {
    api.setUserAvatar(res.avatar);
    // res.avatar = res.url;
    // delete res.url;
    profile.setUserAvatarInfo(res);
  });

  editAvatarButton.addEventListener("click", () => {
    const user = profile.getUserAvatarInfo();
    avatarInput.value = user.avatar;
    avatarForm.open();
  });
    
  // Set event listeners to open forms
  profileForm.setEventListeners();
  avatarForm.setEventListeners()

  // Call FormValidator for forms
  editProfileValidation.enableValidation();
  avatarCardValidation.enableValidation();

})



