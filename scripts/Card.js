function togglePopup(modal) {
  modal.classList.toggle("popup_opened");
  if (modal.classList.contains("popup_opened")) {
    document.addEventListener("keyup", escClose);
  } else {
    document.removeEventListener("keyup", escClose);
  };
};

function escClose(evt) {
  const openedPopup = document.querySelector(".popup_opened");

  if (evt.key === "Escape") {
    togglePopup(openedPopup);
  };
};


function showImage (link, name) {
  const displayImage = document.querySelector(".popup__image")
  const displayCaption = document.querySelector(".popup__image-caption");
  const imagePopup = document.querySelector(".popup_type_display-image");

  displayImage.src = link;
  displayImage.alt = name;
  displayCaption.textContent = name;

  togglePopup(imagePopup); 

}



class Card {
  constructor(data, cardTemplateSelector) {
    this._link = data.link;
    this._name = data.name;

    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector(".photo-grid__item")
      .cloneNode(true);

    return cardTemplate;
  }

  _showImage(link, name) {
    this._link.src = link;
    this._link.alt = name;
    this._name.textContent = name;
  }

  _addEventListeners() {
    const cardImage = this._card.querySelector(".photo-grid__image");
    const cardLikeButton = this._card.querySelector(".photo-grid__like");
    const cardRemoveButton = this._card.querySelector(".photo-grid__remove");


    cardLikeButton.addEventListener("click", (evt) => {
      this._toggleHeart(evt);
    })

    cardRemoveButton.addEventListener("click", (evt) => {
      evt.target.closest(".photo-grid__item").remove();
    })

    cardImage.addEventListener("click", () => {
      showImage(this._link, this._name); 
    })
  };

  _toggleHeart(evt) {
    evt.target.classList.toggle('photo-grid__like_true');
  }



  generateCard = () => {
    
    this._card = this._getCardTemplate(); 

    this._card.querySelector('.photo-grid__title').textContent = this._name;
    this._card.querySelector('.photo-grid__image').style.backgroundImage = `url(${this._link})`;

    this._addEventListeners();

    return this._card;
  }

}

export default Card;