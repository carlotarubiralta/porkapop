// porkapop/shared/header/HeaderController.js
import { updateHeader } from './headerView.js';

class HeaderController {
    constructor(headerElement) {
        this.headerElement = headerElement;
        this.updateHeader();
    }

    updateHeader() {
        updateHeader();
    }
}

export default HeaderController;
