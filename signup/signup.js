// porkapop/signup/signup.js
import SignupPageController from './SignupPageController.js';
import HeaderController from '../shared/header/HeaderController.js';


document.addEventListener('DOMContentLoaded', () => {
    new SignupPageController();
    new HeaderController(document.querySelector('header'));

});
