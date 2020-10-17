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

// Profile form variables
const profileFormNameField = document.querySelector(".popup__field_type_name");
const profileFormTitleField = document.querySelector(".popup__field_type_title");


// Avatar variables
const avatarPopup = document.querySelector(".popup_type_edit-avatar");
const editAvatarButton = document.querySelector(".profile__user-avatar_overlay");
const editAvatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = document.querySelector(".profile__user-avatar")

// Add card form variables
const cardPopup = document.querySelector(".popup_type_add-card");
const addButton = document.querySelector(".profile__add-button");
const addCardForm = cardPopup.querySelector('.popup__form');

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

// FORM FUNCTIONS
// Create new image popup and set card event listeners
const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();

// Create delete confirmation popup and set event listeners
const deleteForm = new PopupWithForm(deleteCardPopup)
deleteForm.setEventListeners();

// Determines if request is successful and changes button text
function loading(isLoading, popup) {
  if(isLoading) {
    popup.querySelector(".popup__button").value = "Saving...";
  } else {
    popup.querySelector(".popup__button").value = "Save";
  }
}

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
    loading(true, cardPopup);
    api.addCard(data)
    .then(res => {
      renderCard(res);
      newCardForm.close();
      loading(false, cardPopup);
    })
    .catch(err => console.log(err));
  });

  // Set event listeners to open new card form
  newCardForm.setEventListeners();

  // Add event listener for add card button and open form upon click
  addButton.addEventListener("click", () => {
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
          api.removeCard(cardId)
          .then(() => {
            card.deleteCard();
            deleteForm.close();
          })
          .catch(err => console.log(err))
        })
      },
      handleLikeClick: (cardId, likeIcon) => {
        console.log(likeIcon.classList);
        if(likeIcon.classList.contains("photo-grid__like_true")) {
          api.cardLikeRemove(cardId)
          .then(res => {
            card.showLikesTotal(res.likes.length);
            card.handleLikeIcon(likeIcon);
          })
          .catch(err => console.log(err))

        } else {
          api.cardLikeAdd(cardId)
          .then(res => {
            card.showLikesTotal(res.likes.length);
            card.handleLikeIcon(likeIcon);
          })
          .catch(err => console.log(err))
        }
      }
      }, 
      userId,
      cardTemplateSelector
    );
    imageList.addItem(card.generateCard());
  }

// PROFILE & AVATAR FORMS
  // Declare profile with UserInfo class
  const profile = new UserInfo(nameInput, jobInput, avatarInput);
  profile.setUserTextInfo({ name:userData.name, title:userData.about });
  profile.setUserAvatarInfo({ avatar:userData.avatar });

  // Create profile form and add event listener to edit button
  const profileForm = new PopupWithForm(profilePopup, (data) => {
    loading(true, profilePopup);
    api.setUserInfo(data)
    .then(res => {
      profile.setUserTextInfo({ name:res.name, title:res.about })
      profileForm.close();
      loading(false, profilePopup);
    })
    .catch(err => console.log(err))
  });
    
  editButton.addEventListener("click", () => {
    const user = profile.getUserTextInfo();
    profileFormNameField.value = user.name;
    profileFormTitleField.value = user.title;
    profileForm.open();
  });

  // Create avatar form and add event listener to editAvatarButton
  const avatarForm = new PopupWithForm(avatarPopup, (data) => {
    loading(true, avatarPopup);
    api.setUserAvatar(data.avatar)
    .then((res) => {
      avatarInput.src = res.avatar;
      avatarForm.close();
      loading(false, avatarPopup);
      }
    )
    .catch(err => console.log(err));
  });

  editAvatarButton.addEventListener("click", () => {
    avatarForm.open();
  });
    
  // Set event listeners to open forms
  profileForm.setEventListeners();
  avatarForm.setEventListeners();

  // Call FormValidator for forms
  editProfileValidation.enableValidation();
  avatarCardValidation.enableValidation();
})

.catch(err => console.log(err))


