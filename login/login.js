// porkapop/login/login.js
import LoginPageController from './LoginPageController.js';
import HeaderController from '../shared/header/HeaderController.js';


document.addEventListener('DOMContentLoaded', () => {
    new LoginPageController();
    new HeaderController(document.querySelector('header'));

});
