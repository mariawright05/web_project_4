import {togglePopup, escClose} from "./utils.js";
import FormValidator from './FormValidator.js';
import Card from './Card.js';

// Form definitions
const defaultConfig = {
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_visible"
}

const profilePopup = document.querySelector(".popup_type_edit-profile");
const cardPopup = document.querySelector(".popup_type_add-card");

const addCardForm = cardPopup.querySelector('.popup__form');
const editProfileForm = profilePopup.querySelector('.popup__form');

// Accesses and calls FormValidator class for both forms
const editProfileValidation = new FormValidator(defaultConfig, editProfileForm);
const addCardValidation = new FormValidator(defaultConfig, addCardForm);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

// Wrappers
const imagePopup = document.querySelector(".popup_type_display-image");
const profileForm = profilePopup.querySelector(".popup__profile-wrapper");
const cardForm = cardPopup.querySelector(".popup__card-wrapper");

// Buttons and other DOM elements
const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = profilePopup.querySelector(".popup__close-button");

const addButton = document.querySelector(".profile__add-button");
const closeAddButton = cardPopup.querySelector(".popup__close-button");

const closeImageButton = imagePopup.querySelector(".popup__close-button");

// Form inputs
const profileName = document.querySelector(".profile__user-name");
const profileAbout = document.querySelector(".profile__user-about");

const nameInput = document.querySelector(".popup__field_type_name");
const jobInput = document.querySelector(".popup__field_type_title");

const cardTitle = cardPopup.querySelector(".popup__field_type_card-title");
const cardLink = cardPopup.querySelector(".popup__field_type_url");

// Card elements
const imageList = document.querySelector(".photo-grid");
const cardTemplateSelector = ".card-template";



// TOGGLE FUNCTIONS

// Opens or closes all popups 
// function togglePopup(modal) {
//   modal.classList.toggle("popup_opened");
//   if (modal.classList.contains("popup_opened")) {
//     document.addEventListener("keyup", escClose);
//   } else {
//     document.removeEventListener("keyup", escClose);
//   };
// };

//Closes popup if clicked outside popup
function closeClick() {
  const popups = document.querySelectorAll(".popup");
  
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        togglePopup(evt.target);
      };
    });
  });
};

closeClick();

// Image popup close
closeImageButton.addEventListener("click", () => {
  togglePopup(imagePopup);
});


// PROFILE FORM

// Saves profile information and closes popup
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  
  togglePopup(profilePopup);
  
});

// Opens profile form
editButton.addEventListener("click", () => {
  togglePopup(profilePopup);
});

// Closes profile form
closeEditButton.addEventListener("click", () => {
  togglePopup(profilePopup);
});



// IMAGE CARDS

// Opens add card form
addButton.addEventListener("click", () => {
  togglePopup(cardPopup);
});

// Closes add card form
closeAddButton.addEventListener("click", () => {
  togglePopup(cardPopup);
});


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


// Adds card to display at top of list
const renderCard = (data) => {
  const card = new Card(data, cardTemplateSelector)
  imageList.prepend(card.generateCard());
}

// Adds initial cards 
initialCards.forEach((data) => {
  renderCard(data);
})

// Add new card using form
cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const data = {name: cardTitle.value, link: cardLink.value};
  renderCard(data);
  togglePopup(cardPopup);
})
