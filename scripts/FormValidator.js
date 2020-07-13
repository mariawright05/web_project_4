class FormValidator {
  constructor(settings, formElement) {  
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  _showErrorMessage(inputElement) {
    const error = this._formElement.querySelector(`#${inputElement.id}-error`);
    error.textContent = inputElement.validationMessage;
  
    error.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideErrorMessage(inputElement) {
    const error = this._formElement.querySelector(`#${inputElement.id}-error`);
    error.textContent = '';

    error.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideErrorMessage(inputElement);
    } else {
      this._showErrorMessage(inputElement);
    }
  }

  _toggleButtonState(inputs, button) {

    const isValid = inputs.every((inputElement) => inputElement.validity.valid);

    if(isValid) {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute("disabled", "");
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute("disabled", "");
    }    
  }

  _setEventListeners() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const button = this._formElement.querySelector(this._submitButtonSelector);

    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputs, button);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', ((evt) => {
      evt.preventDefault()
    }));

    this._setEventListeners();    
  }

}

export default FormValidator;