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
const editAvatarButton = document.querySelector(".avatar__edit-button");
const editAvatarForm = avatarPopup.querySelector(".popup__form");
const linkInput = document.querySelector(".profile__user-avatar")

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
const avatarCardValidations = new FormValidator(defaultConfig, editAvatarForm);




// IMAGE CARD VARIABLES
// Image section
const imageContainer = document.querySelector(".photo-grid");
const cardTemplateSelector = ".card-template";

// Image popup
const imagePopup = document.querySelector(".popup_type_display-image");


// INIT API CLASS AND ADD USER GROUP AND AUTH TOKEN
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-3",
  headers: {
    authorization: "5707ddd2-2e4a-4b11-a4a0-b8d42848d184",
    "Content-Type": "application/json"
  }
});


// IMAGE CARDS
// Get initial card list
api.getCardList()
.then(res => {
  const imageList = new Section({
    items: res,
    renderer: (data) => {
      const card = new Card({
        data, 
        handleCardClick, 
        handleDeleteClick: ((cardID) => {api.removeCard(cardID)})}, 

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
      data: {link: url.value, name: title.value}, 
      handleCardClick,
      handleDeleteClick: ((cardId) => {api.removeCard(cardId)})},
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


// PROFILE FORM
// Get profile from server
api.getUserInfo()
.then(res => {
  // Declare profile with UserInfo class
  const profile = new UserInfo(nameInput, jobInput);
  profile.setUserInfor({ name: res.name, title: res.about });

  //Create profile form and adds event listener to edit button
  const profileForm = new PopupWithForm(profilePopup, (data) => {
    api.setUserInfo(data);
    profile.setUserInfor(data);
  });
    
  editButton.addEventListener("click", () => {
    const user = profile.getUserInfor();
    nameInput.value = user.name;
    jobInput.value = user.title;
    profileForm.open();
  });
    
  // Set event listeners to open form
  profileForm.setEventListeners();

  // Call FormValidator for profile form
  editProfileValidation.enableValidation();
})

// USER AVATAR
// Create avatarForm with popupWithForm and call api.setUserAvatar({ avatar })
const avatarForm = new PopupWithForm(avatarPopup, (data) => {
  api.setUserAvatar(data);


})
// Add event listener to edit button
editAvatarButton.addEventListener("click", () => {
  const user=
})
// Set event listener to avatarForm to open
// Call FormValidator for avatar form


// const avatarPopup = document.querySelector(".popup_type_edit-avatar");
// const editAvatarButton = document.querySelector(".avatar__edit-button");
// const editAvatarForm = avatarPopup.querySelector(".popup__form");
// const linkInput = document.querySelector(".profile__user-avatar")



// NOT MINE
// const avatarEditForm = new PopupWithForm({popupSelector: avatarPopout, formSubmission: () =>{
//   setButtonText(avatarPopout, "Saving")
//   avatar.src = avatarLink.value;
//   api.setUserAvatar({avatar: avatarLink.value});
//   setButtonText(avatarPopout, "Save")
// }})
// avatarEditForm.setEventListeners();
// const avatarValidator = new FormValidator(defaultConfig, avatarFormElement)
// avatarValidator.enableValidation();

// avatarEdit.addEventListener("click", ()=> toggleModal(avatarPopout));

// const profileValidator = new FormValidator(defaultConfig, profileFormElement);
// const galleryValidator = new FormValidator(defaultConfig, galleryFormElement);
// profileValidator.enableValidation();
// galleryValidator.enableValidation();

// const imagePopup = new PopupWithImage(picturePopout);
// imagePopup.setEventListeners();