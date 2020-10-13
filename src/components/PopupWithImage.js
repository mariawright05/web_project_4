import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".popup__image");
    this._caption = this._popupElement.querySelector(".popup__image-caption");
  }

  open(data) {
    super.open();
    this._link = data.link;
    this._name = data.name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._caption.textContent = this._name;
  }

}

export default PopupWithImage;
