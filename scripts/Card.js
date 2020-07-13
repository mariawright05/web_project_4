function togglePopup(modal) {
  modal.classList.toggle("popup_opened");
  if (modal.classList.contains("popup_opened")) {
    document.addEventListener("keyup", escClose);
  } else {
    document.removeEventListener("keyup", escClose);
  };
};

class Card {
  constructor(data, cardTemplateSelector) {
    this._link = data.link;
    this._text = data.text;

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
      this._showImage(data); 
      togglePopup(imagePopup); 
    })
  };

  _toggleHeart(evt) {
    evt.target.classList.toggle('photo-grid__like_true');
  }

  _showImage(data) {
    displayImage.src = data.link;
    displayImage.alt = data.name;
    displayCaption.textContent = data.name;
  }

  generateCard = () => {
    const element = this._getCardTemplate();
    
    this._card = element; 

    this._card.querySelector('.photo-grid__title').textContent = this._name;
    this._card.querySelector('.photo-grid__image').style.backgroundImage = `url(${this._link})`;

    this._addEventListeners();

    return this._card;
  }

}

export default Card;