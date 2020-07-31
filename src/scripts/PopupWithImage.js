import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    super.open();
    this._link = data.link;
    this._name = data.name;
    this._popupSelector.querySelector(".popup__image").src = this._link;
    this._popupSelector.querySelector(".popup__image-caption").textContent = this._name;
  }

}



export default PopupWithImage;
