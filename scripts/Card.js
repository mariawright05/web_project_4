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
    displayImage.src = link;
    displayImage.alt = name;
    displayCaption.textContent = name;
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
      this._showImage(this._link, this._name); 
      togglePopup(imagePopup); 
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