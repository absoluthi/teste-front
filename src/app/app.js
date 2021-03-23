import {
  TableService
} from './table.service.js';
import {
  FormService
} from "./form.service.js";
import {
  UserService
} from "./user.service.js";
import {
  PopupService
} from './popup.service.js';
import { LoadingService } from './loading.service.js';

import '../assets/icons/create-user.svg'
import '../assets/icons/sucess.svg'
import '../assets/icons/error.svg'
import '../assets/icons/loading.svg'
import '../assets/icons/update-user.svg'

import '../assets/scss/pages/home.scss';

const submitForm = require('./utils/submit-form');
const detectDevice = require('./utils/detect-device');
export class App {
  constructor() {
    this.tableService = new TableService();
    this.userService = new UserService();
    this.formService = new FormService();
    this.popupService = new PopupService();
    this.loadingrService = new LoadingService();
    this.isMobileDevice = detectDevice();
  }

  init() {
    let _app = this;
    _app.loadingrService.startLoading();

    if (_app.userService.checkUsers()) {
      const userData = _app.userService.formatUserData();
      _app.tableService.populateTable(userData);
      _app.loadingrService.finishLoading();
    } else {
      _app.userService.getUsers().then(function(resp) {
        _app.userService.saveUserData(resp);
        return resp
      }).then(function(resp) {
        _app.loadingrService.finishLoading();
        _app.tableService.populateTable(resp);
      });
    }

    _app.userService.handleAddNewUserClick(event => {
      event.preventDefault();
      _app.formService.clearForm();
      _app.popupService.showPopup('create-user')
    });

    _app.formService.handleSubmitForm(event => {
      event.preventDefault();
      let form = event.target;
      let dataAction = event.submitter.dataset.action;
      let dataRef = event.submitter.dataset.ref;

      _app.popupService.startLoading();

      _app.formService.validateFields().then((errorFields) => {
        if (errorFields.length) {
          _app.popupService.finishLoading();
          return _app.formService.applyErrors(errorFields);
        } else {
          if (dataAction == 'create') {
            return _app.userService.registerNewUser(form)
          } else if (dataAction == 'update') {
            return _app.userService.updateUser(form, dataRef);
          }
        }
      }).then(users => {
        if (users) {
          setTimeout(() => {
            _app.tableService.populateTable(users);
            _app.popupService.finishLoading();
            if (dataAction == 'create') {
              _app.popupService.showPopup('sucess-create');
            } else if (dataAction == 'update') {
              _app.popupService.showPopup('sucess-update');
            }
            return _app.formService.clearForm();
          }, 500);
        }
      })
    });

    _app.tableService.handleUserActionsClick(event => {
      const button = event.target;
      let selectedItemIndex;
      let isRemoveButton = event.path.filter((element) => {
        let elementClasses = element.classList;
        if (elementClasses) {
          if (elementClasses.contains('users-table__button--remove')) {
            selectedItemIndex = element.dataset.ref;
            return element
          }
        }
      });
      let isEditButton = event.path.filter((element) => {
        let elementClasses = element.classList;
        if (elementClasses) {
          if (elementClasses.contains('users-table__button--edit')) {
            selectedItemIndex = element.dataset.ref;
            return element
          }
        }
      });
      isRemoveButton = isRemoveButton.length ? true : false;
      isEditButton = isEditButton.length ? true : false;


      if (isEditButton) {
        // return _this.editUser();
        _app.userService.getUserByIndex(selectedItemIndex).then(user => {
          _app.popupService.showPopup('update-user');

          document.getElementById('submit-form-btn').dataset.ref = selectedItemIndex;
          document.getElementById('submit-form-btn').dataset.action = 'update';

          return user;

        }).then(user => _app.formService.populateForm(user));
      } else if (isRemoveButton) {
        document.getElementById('delete-user-btn').dataset.ref = selectedItemIndex;
        document.getElementById('delete-user-btn').dataset.action = 'delete';
        return _app.popupService.showPopup('delete-user')
      }
    });

    _app.popupService.handlePopupCreateClick(event => submitForm('create'));
    _app.popupService.handlePopupUpdateClick(event => submitForm('update'));
    _app.popupService.handlePopupDeleteClick(event => _app.userService.deleteUser(event.target.dataset.ref).then(users => {
      _app.userService.saveUserData(users);
      _app.tableService.populateTable(users);
      _app.popupService.showPopup('sucess-delete')
    }));

    if (_app.isMobileDevice) {
    _app.tableService.handleNameColumnClick(event => {
        return _app.tableService.table.classList.toggle('users-table--collapsed')
      });
      setTimeout(() => {
        _app.tableService.nameColumn.click();
      }, 1000);
    }
  }
}