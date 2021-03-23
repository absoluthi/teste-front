
import { User } from './user.js';
const formatValue = require('./utils/format-value.js');

export class UserService {
  constructor() {
    this.users = [];
    this.addNewUserButton = document.getElementById('new-user-btn');
  }

  checkUsers() {
    const usersData = localStorage.getItem('users');
    return usersData != null && usersData.length > 0;
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      fetch('https://private-21e8de-rafaellucio.apiary-mock.com/users')
        .then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        }).then(function(data) {
          // console.log('retorno API -> ', data);
          resolve(data)
        })
        .catch(function(err) {
          console.error('Failed retrieving information', err);
          reject(err)
        });
    });
  }

  saveUserData(data) {
    let formattedData = JSON.stringify(data);
    return localStorage.setItem('users', formattedData);
  }
  
  formatUserData() {
    let rawData = localStorage.getItem('users');
    if (rawData != null && rawData.length > 0) {
      return JSON.parse(rawData);
    }
  }

  createNewUser(form) {
    const cpf = formatValue(form.elements['cpf-input'].value, 'number');
    const name = form.elements['name-input'].value;
    const email = form.elements['email-input'].value;
    const phone = formatValue(form.elements['phone-input'].value, 'number');

    return new User(name, cpf, phone, email)
  }

  registerNewUser(form) {
    const _this = this;
    let _users = this.formatUserData();

    return new Promise((resolve, reject) => {
      let userCreated = _this.createNewUser(form)

      resolve(userCreated)

    }).then(function (newUser) {
      _users.push(newUser);
      _this.saveUserData(_users);

      return _users;
    })
  }

  updateUser(form, userIndex) {
    const _this = this;
    const _users = this.formatUserData();
    return new Promise((resolve, reject) => {
      let userCreated = _this.createNewUser(form)

      resolve(userCreated)

    }).then(function (newUser) {
      _users[userIndex] = newUser;

      _this.saveUserData(_users);
      return _users;
    })
  }

  deleteUser(userIndex) {
    const _this = this;
    const _users = this.formatUserData();

    return new Promise((resolve, reject) => {
      let remainingUsers = _users.reduce(function(itens, currentItem, index) {
        if (index != userIndex) {
          itens.push(currentItem);
        }
        return itens;
      }, []);

      resolve(remainingUsers)

    })
  }

  getUserByIndex(userIndex) {
    let _users = this.formatUserData();
    return new Promise((resolve, reject) => {
      let userSelected = _users[userIndex];
      let userObject = {
        name: userSelected.name,
        cpf: userSelected.cpf,
        phone: userSelected.phone,
        email: userSelected.email,
      }
      resolve(userObject)
    });
  }

  handleAddNewUserClick (callbackFunction) {
    this.addNewUserButton.addEventListener('click', callbackFunction)
  }
}