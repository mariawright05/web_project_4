import {showImage} from "./utils.js";

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

    cardRemoveButton.addEventListener("click", () => {
      this._card.closest(".photo-grid__item").remove();
      this._card = null;
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