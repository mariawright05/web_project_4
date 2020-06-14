// Wrappers
const profilePopup = document.querySelector(".popup_type_edit-profile");
const cardPopup = document.querySelector(".popup_type_add-card");
const imagePopup = document.querySelector(".popup_type_image");
const formElement = document.querySelector(".popup__container");

// Buttons and other DOM elements
const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = profilePopup.querySelector(".popup__close-button");

const addButton = document.querySelector(".profile__add-button");
const closeAddButton = cardPopup.querySelector(".popup__close-button");

const closeImageButton = imagePopup.querySelector(".popup__close-button");


const profileName = document.querySelector(".profile__user-name");
const profileAbout = document.querySelector(".profile__user-about");

const displayImage = document.querySelector(".popup__image")
const displayCaption = document.querySelector(".popup__image-caption");

//Form functions
function togglePopup(modal) {
  modal.classList.toggle("popup_opened");
}

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
  
  togglePopup();
})

// Profile form
const nameInput = document.querySelector(".popup__field_type_name");
const jobInput = document.querySelector(".popup__field_type_title");



editButton.addEventListener("click", () => {
  togglePopup(profilePopup);
  console.log("clicked edit button");
});
closeEditButton.addEventListener("click", () => {
  togglePopup(profilePopup);
});


// Add card form
addButton.addEventListener("click", () => {
  togglePopup(cardPopup);
});
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

const cardTemplate = document.querySelector(".card-template").content.querySelector(".photo-grid__item");
//const gridItem = document.querySelector(".photo-grid__item");
const imageList = document.querySelector(".photo-grid");


const createCard = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".photo-grid__title");
  const cardImage = cardElement.querySelector(".photo-grid__image");
  const cardLikeButton = cardElement.querySelector(".photo-grid__like");
  const cardRemoveButton = cardElement.querySelector(".photo-grid__remove");

  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;

  cardLikeButton.addEventListener("click", () => {
    // changeHeartColor()
  })

  cardRemoveButton.addEventListener("click", (e) => {
    e.target.closest(".photo-grid__item").remove();
  })

  cardImage.addEventListener("click", () => {
    showImage(data); 
    togglePopup(imagePopup); 
  })

  return cardElement;
}



const renderCard = (data) => {
  imageList.prepend(createCard(data));
}


initialCards.forEach((data) => {
  renderCard(data);
})

// Image popup

closeImageButton.addEventListener("click", () => {
  togglePopup(imagePopup);
});

function showImage (data) {
  displayImage.src = data.link;
  displayImage.alt = data.name;
  displayCaption.textContent = data.name;
}
