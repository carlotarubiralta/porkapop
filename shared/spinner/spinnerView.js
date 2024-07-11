// porkapop/shared/spinner/SpinnerView.js

class SpinnerView {
    constructor() {
        this.spinnerElement = document.createElement('div');
        this.spinnerElement.className = 'spinner hidden';
        this.spinnerElement.innerHTML = `<div class="spinner-border" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>`;
        document.body.appendChild(this.spinnerElement);
    }

    showSpinner() {
        this.spinnerElement.classList.remove('hidden');
    }

    hideSpinner() {
        this.spinnerElement.classList.add('hidden');
    }
}

export default SpinnerView;
