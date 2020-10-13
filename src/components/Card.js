class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, userId, cardTemplateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._id = data._id;
    this._likesTotal = data.likes.length;
    this._likesArray = data.likes;
    this._owner = data.owner;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getId() {
    return this._id;
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
      this._handleLikeClick(this._getId(), cardLikeButton);
    });

    cardRemoveButton.addEventListener("click", () => {
      this._handleDeleteClick(this._getId());
    });

    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link }); 
    })
  };

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  showLikesTotal(likesTotal) {
    this._card.querySelector('.photo-grid__like-count').textContent = likesTotal;
  }

  _handleInitialLikes() {
    const cardLikeButton = this._card.querySelector(".photo-grid__like");
    const cardLikes = Array.from(this._likesArray);
    cardLikes.forEach(element => {
      if (element._id === this._userId) {
        cardLikeButton.classList.add("photo-grid__like_true");
      }
    })
  }

  handleLikeIcon(likeIcon) {
      likeIcon.classList.toggle("photo-grid__like_true");
  }
  
  _deleteRemoveButton() {
    const cardRemoveButton = this._card.querySelector(".photo-grid__remove");
    if (this._userId !== this._owner._id) {
      cardRemoveButton.remove();
    }
  }

  generateCard() {
    
    this._card = this._getCardTemplate(); 

    this._card.querySelector('.photo-grid__title').textContent = this._name;
    this._card.querySelector('.photo-grid__image').style.backgroundImage = `url(${this._link})`;
    this._card.querySelector('.photo-grid__like-count').textContent = this._likesTotal;

    this._handleInitialLikes();
    this._addEventListeners();
    this._deleteRemoveButton();

    return this._card;
  }

}

export default Card;