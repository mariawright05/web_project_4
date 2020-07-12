class Card {
  constructor(data, templateElement) {
    this._cardText = data.cardText;
    this._cardImage = data.cardImage;
    this._cardLikeButton = data.cardLikeButton;
    this._cardRemoveButton = data.cardRemoveButton;

    this._templateElement = templateElement;
  }
}


// new Card(data, templateElement) {

// }


// const cardElement = cardTemplate.cloneNode(true);
//   const cardText = cardElement.querySelector(".photo-grid__title");
//   const cardImage = cardElement.querySelector(".photo-grid__image");
//   const cardLikeButton = cardElement.querySelector(".photo-grid__like");
//   const cardRemoveButton