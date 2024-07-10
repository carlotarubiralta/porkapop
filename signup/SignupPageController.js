// porkapop/signup/SignupPageController.js
import PageController from '../shared/PageController.js';
import SignupController from './SignupController.js';

class SignupPageController {
    constructor() {
        this.pageController = new PageController();
        this.signupController = new SignupController(document.getElementById('signup-form'));
    }
}

export default SignupPageController;
