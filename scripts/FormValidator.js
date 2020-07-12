class FormValidator {
  constructor(settings, formElement) {  //what settings do we need? in validation.js enableValidation
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this _inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  _showErrorMessage() {

  }

  _hideErrorMessage() {

  }

  _checkInputValidity() {
    if (input.validity.valid) {
      hideErrorMessage(input, form, rest);
    } else {
      showErrorMessage(input, form, rest);
    }
  }

  _toggleButtonState() {
    
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    this._inputSelector.addEventListener('input', () => {
      this._checkInputValidity();
      this._toggleButtonState(inputs, but);
    })
  }

}
// calls this for 2 forms - add card and edit info that wil be added to index.js
// new FormValidator(settings, formElement) {

// }

formSelector: ".popup__form",
  inputSelector: ".popup__field"
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__error",

  errorClass: "popup__error_visible"