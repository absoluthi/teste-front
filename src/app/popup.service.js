export class PopupService {
  constructor() {
    this.popupElement = document.querySelector('.popup');
    this.createButton = document.getElementById('create-user-btn');
    this.updateButton = document.getElementById('update-user-btn');
    this.deleteButton = document.getElementById('delete-user-btn');
    this.cancelButton = document.getElementById('cancel-popup-btn');

    this.handlePopupCancelClick();
  }

  showPopup(action) {
    this.cleanClasses();
    this.changeTextFromCancelButton(action);
    this.popupElement.classList.add('popup--active');
    return this.popupElement.classList.add(`popup--${action}`)
  }
  
  startLoading(clickedButton) {
    return this.popupElement.classList.add('popup--loading');
  }
  
  finishLoading(clickedButton) {
    return this.popupElement.classList.remove('popup--loading');
  }

  changeTextFromCancelButton(action) {
    if (action.indexOf('sucess') >= 0 || action.indexOf('error') >= 0) {
      return this.cancelButton.innerText = 'Fechar';
    }else {
      return this.cancelButton.innerText = 'Cancelar';
    }
  }

  cleanClasses() {
    this.popupElement.classList.remove('popup--active');
    this.popupElement.classList.remove('popup--create-user')
    this.popupElement.classList.remove('popup--update-user')
    this.popupElement.classList.remove('popup--delete-user')
    this.popupElement.classList.remove('popup--error-validation')
    this.popupElement.classList.remove('popup--error-general')
    this.popupElement.classList.remove('popup--sucess-create')
    this.popupElement.classList.remove('popup--sucess-update')
    this.popupElement.classList.remove('popup--sucess-delete')
  }

  handlePopupCreateClick(callbackFunction) {
    this.createButton.addEventListener('click', callbackFunction)
  }

  handlePopupUpdateClick(callbackFunction) {
    this.updateButton.addEventListener('click', callbackFunction)
  }

  handlePopupDeleteClick(callbackFunction) {
    this.deleteButton.addEventListener('click', callbackFunction)
  }

  handlePopupCancelClick() {
    const _this = this;
    this.cancelButton.addEventListener('click', event => _this.cleanClasses())
  }
}