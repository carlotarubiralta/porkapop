// porkapop/shared/spinner/SpinnerController.js

class SpinnerController {
    static showSpinner() {
        const spinnerElement = document.createElement('div');
        spinnerElement.className = 'spinner';
        spinnerElement.innerHTML = `<div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>`;
        document.body.appendChild(spinnerElement);
    }

    static hideSpinner() {
        const spinnerElement = document.querySelector('.spinner');
        if (spinnerElement) {
            spinnerElement.remove();
        }
    }
}

export default SpinnerController;
