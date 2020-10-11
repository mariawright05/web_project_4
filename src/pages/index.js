import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";
import "./index.css";

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
// const url = addCardForm.querySelector('.popup__field_type_url');
// const title = addCardForm.querySelector('.popup__field_type_card-title');

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

const deleteCardPopup = document.querySelector(".popup_type_delete-card");


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


// GET INITIAL APP INFO
api.getAppInfo()
.then(([userData, initialCardList]) => {
  const userId = userData._id;

  // Get initial card list from server
  const imageList = new Section({
    items: initialCardList,
    renderer: renderCard
  }, imageContainer);

  imageList.renderElements();

  // Open new card form
  const newCardForm = new PopupWithForm(cardPopup, (data) => {
    api.addCard(data)
    .then(res => {
      renderCard(res);
    })
  });

  // Set event listeners to open new card form
  newCardForm.setEventListeners();

  // Add event listener for add card button and open form upon click
  addButton.addEventListener("click", (evt) => {
    newCardForm.resetButtonText();
    newCardForm.open();
  });

  // Call FormValidator for add card form
  addCardValidation.enableValidation();

  function renderCard(data) {
    const card = new Card({
      data, 
      handleCardClick: () => {
        popupWithImage.open(data);
      }, 
      handleDeleteClick: (cardId) => {
        deleteForm.open(cardId);
        deleteForm.setSubmitAction(() => {
          api.removeCard(cardId).then(() => {
            card.deleteCard();
            deleteForm.close();
          })
        })
      },
      handleLikeClick: (cardId) => {
        if(card.likeIcon.classList.contains("photo-grid__like_true")) {
          card.likeIcon.classList.remove("photo-grid__like_true");
          // api.cardLikeRemove(cardId).then(res => card.retrieveUserLikes(res.likes.length))
        } else {
          card.likeIcon.classList.add("photo-grid__like_true");
          // api.cardLikeAdd(cardId).then(res => card.retrieveUserLikes(res.likes.length))
        }
      }
      }, 
      userId,
      cardTemplateSelector
    );
    imageList.addItem(card.generateCard());
  }
})

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
    profileForm.resetButtonText();
    profileForm.open();
  });

  // Create avatar form and add event listener to editAvatarButton
  const avatarForm = new PopupWithForm(avatarPopup, (res) => {
    api.setUserAvatar(res.avatar);
    profile.setUserAvatarInfo(res);
  });

  editAvatarButton.addEventListener("click", () => {
    const user = profile.getUserAvatarInfo();
    avatarInput.value = user.avatar;
    avatarForm.resetButtonText();
    avatarForm.open();
  });
    
  // Set event listeners to open forms
  profileForm.setEventListeners();
  avatarForm.setEventListeners();

  // Call FormValidator for forms
  editProfileValidation.enableValidation();
  avatarCardValidation.enableValidation();

  return res._id;
})

// Create new image popup and set card event listeners
const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();

// Create delete confirmation popup and set event listeners
const deleteForm = new PopupWithForm(deleteCardPopup)
deleteForm.setEventListeners();


