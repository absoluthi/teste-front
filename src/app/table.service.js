import deleteUserIcon from '../assets/icons/delete-user.svg';
import editUserIcon from '../assets/icons/edit-user.svg';

const formatValue = require("./utils/format-value");
const giveNickName = require("./utils/give-nickname");
export class TableService {
  constructor() {
    this.table = document.getElementById('users-table');
    this.body = document.querySelector('.users-table__body');
    this.nameColumn = document.querySelector('.users-table__head .users-table__column--name');
    this.content = [];
  }

  clearTable() {
    return this.body.innerHTML = "";
  }

  populateTable(arrayContent) {
    let users = arrayContent;

    this.clearTable();

    for (let index = 0; index < users.length; index++) {
      const element = users[index];

      let name = element.name;
      let cpf = formatValue(element.cpf, 'cpf');
      let email = element.email;
      let phone = formatValue(element.phone, 'phone');
      let nickname = giveNickName(element.name);
      let dataId = index;
      let newRow = document.createElement('div');
      newRow.classList.add('users-table__line')
      newRow.innerHTML =
        `<div class="users-table__column users-table__column--name" data-nickname="${nickname}">
        <p class="users-table__text">${name}</p>
      </div>
        <div class="users-table__column users-table__column--cpf">
          <p class="users-table__text">${cpf}</p>
        </div>
        <div class="users-table__column users-table__column--phone">
          <p class="users-table__text">${phone}</p>
        </div>
        <div class="users-table__column users-table__column--email">
          <p class="users-table__text">${email}</p>
        </div>
        <div class="users-table__column users-table__column--actions">
          <button class="users-table__button users-table__button--edit" data-ref="${dataId}" alt="Editar usuário">
            <i class="icon icon--edit">
              <img src="${editUserIcon}" alt="Editar Usuário">
            </i>
          </button>
          <button class="users-table__button users-table__button--remove" data-ref="${dataId}" alt="Deletar usuário">
            <i class="icon icon--remove">
              <img src="${deleteUserIcon}" alt="Deleter Usuário">
            </i>
          </button>
        </div>`;


      this.body.appendChild(newRow);
    }
    return;
  }

  handleUserActionsClick(callbackFunction) {
    document.body.addEventListener('click', callbackFunction)
  }

  handleNameColumnClick(callbackFunction) {
    return this.nameColumn.addEventListener('click', callbackFunction)
  }
}