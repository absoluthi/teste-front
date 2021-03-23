import {
  UserService
} from './user.service.js';
import {
  emailIsValid
} from './utils/email-is-valid.js';
const formatValue = require('./utils/format-value');
const hasCompoundName = require('./utils/has-compound-name');
const maskInput = require('./utils/mask-input');

const userService = new UserService();

export class FormService {
  constructor() {
    this.formElement = document.getElementById('user-form');
    this.cpfInput = document.getElementById('cpf-input');
    this.nameInput = document.getElementById('name-input');
    this.emailInput = document.getElementById('email-input');
    this.phoneInput = document.getElementById('phone-input');
    this.submitButton = document.getElementById('submit-form-btn');
    this.formInputs = document.getElementsByClassName('form__input');
    this.loading = false;

    this.maskInputs();
    this.handleInputFocus();
  }

  showForm() {
    return this.formElement.style.display = 'block';
  }

  hideForm() {
    return this.formElement.style.display = 'none';
  }

  clearForm() {
    this.cpfInput.value = '';
    this.nameInput.value = '';
    this.emailInput.value = '';
    this.phoneInput.value = '';
    this.cpfInput.parentNode.classList.remove('form__group--active');
    this.nameInput.parentNode.classList.remove('form__group--active');
    this.emailInput.parentNode.classList.remove('form__group--active');
    this.phoneInput.parentNode.classList.remove('form__group--active');

    return;
  }

  clearField(inputId) {
    return document.getElementById(inputId).parentNode.classList.remove('form__group--error');
  }

  validateFields() {
    const _cpfInput = this.cpfInput.value;
    const _nameInput = this.nameInput.value;
    const _emailInput = this.emailInput.value;
    const _phoneInput = this.phoneInput.value;
    let errorFields = [];

    return new Promise((resolve, reject) => {
      if (_cpfInput == '' || _cpfInput.length < 3) {
        errorFields.push({
          inputId: 'cpf-input',
          message: 'Esse campo deve ter no mínimo 3 caracteres',
        })
      } else if (_cpfInput.length < 14) {
        errorFields.push({
          inputId: 'cpf-input',
          message: 'Digite um CPF válido',
        })
      }

      if (_nameInput == '' || _nameInput.length < 3) {
        errorFields.push({
          inputId: 'name-input',
          message: 'Esse campo deve ter no mínimo 3 caracteres',
        })
      } else if (!hasCompoundName(_nameInput)) {
        errorFields.push({
          inputId: 'name-input',
          message: 'Por favor, informe seu nome completo',
        })
      }

      if (_emailInput == '' || _emailInput.length < 3) {
        errorFields.push({
          inputId: 'email-input',
          message: 'Esse campo deve ter no mínimo 3 caracteres',
        })
      } else if (!emailIsValid(_emailInput)) {
        errorFields.push({
          inputId: 'email-input',
          message: 'Digite um e-mail válido',
        })
      }

      if (_phoneInput == '' || _phoneInput.length < 3) {
        errorFields.push({
          inputId: 'phone-input',
          message: 'Esse campo deve ter no mínimo 3 caracteres',
        })
      } else if (_phoneInput.length < 12) {
        errorFields.push({
          inputId: 'phone-input',
          message: 'Digite um telefone válido',
        })
      }

      resolve(errorFields);
    });
  }

  maskInputs() {
    this.cpfInput.addEventListener('keydown', event => maskInput('cpf-input', 'cpf'));
    this.phoneInput.addEventListener('keydown', event => maskInput('phone-input', 'phone'));
  }

  applyErrors(errorsArray) {
    const errors = errorsArray;

    for (let index = 0; index < errors.length; index++) {
      const element = errors[index];
      const errorMessage = element.message;
      const currentElement = document.getElementById(element.inputId);
      const siblingElement = currentElement.nextElementSibling;
      const parentFieldset = currentElement.parentNode;

      siblingElement.innerText = errorMessage;
      parentFieldset.classList.add('form__group--error');
    }
  }

  handleSubmitForm(callbackFunction) {
    this.formElement.addEventListener('submit', callbackFunction);
  }

  handleInputFocus() {
    const _this = this;
    const inputs = document.querySelectorAll('.form__input');

    for (let index = 0; index < inputs.length; index++) {
      const element = inputs[index];
      const inputId = element.id;
      element.addEventListener('focus', event => {
        const formGroup = event.target.parentNode;
        formGroup.classList.add('form__group--active')
        _this.clearField(inputId)
      });
    }

  }

  populateForm(user) {
    const _form = this.formElement;
    this.cpfInput.parentNode.classList.add('form__group--active');
    this.nameInput.parentNode.classList.add('form__group--active');
    this.emailInput.parentNode.classList.add('form__group--active');
    this.phoneInput.parentNode.classList.add('form__group--active');
    _form.elements['name-input'].value = user.name;
    _form.elements['cpf-input'].value = formatValue(user.cpf, 'cpf');
    _form.elements['phone-input'].value = formatValue(user.phone, 'phone');
    _form.elements['email-input'].value = user.email;
    return;
  }
}