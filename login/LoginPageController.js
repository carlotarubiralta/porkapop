// porkapop/login/LoginPageController.js
import PageController from '../shared/PageController.js';
import LoginController from './LoginController.js';

class LoginPageController {
    constructor() {
        this.pageController = new PageController();
        this.loginController = new LoginController(document.getElementById('login-form'));
    }
}

export default LoginPageController;
