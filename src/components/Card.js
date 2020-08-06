class Card {
  constructor({ data, handleCardClick, handleDeleteClick }, cardTemplateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._id = data.id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  id() {
    return this._id();
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
      this._handleLikeIcon(evt);
    })

    cardRemoveButton.addEventListener("click", () => {
      this._handleDeleteClick();
    })

    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link }); 
    })
  };

  _handleLikeIcon(evt) {
    evt.target.classList.toggle("photo-grid__like_true");
  }

  _handleDeleteCard() {
    this._card.remove();
    this._card = null;
  }



  generateCard() {
    
    this._card = this._getCardTemplate(); 

    this._card.querySelector('.photo-grid__title').textContent = this._name;
    this._card.querySelector('.photo-grid__image').style.backgroundImage = `url(${this._link})`;

    this._addEventListeners();

    return this._card;
  }

}

export default Card;