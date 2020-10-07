import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }

  resetButtonText() {
    const button = this._form.querySelector(".popup__button");

    if (button.value === "Saving...") {
      button.value = "Save" 
    }
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__field");

    this._formValues = {};
    this._inputList.forEach(input => {this._formValues[input.name] = input.value});

    return this._formValues;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }
}

export default PopupWithForm;


