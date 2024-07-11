class SpinnerView {
    constructor() {
        this.spinnerContainer = document.createElement('div');
        this.spinnerContainer.className = 'fixed inset-0 flex items-center justify-center';
        this.spinnerContainer.style.zIndex = '9998';
        this.spinnerContainer.style.display = 'none';
        this.spinnerContainer.innerHTML = `
            <div class="dot-spinner">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        `;
        document.body.appendChild(this.spinnerContainer);
    }

    showSpinner() {
        this.spinnerContainer.style.display = 'flex';
    }

    hideSpinner() {
        this.spinnerContainer.style.display = 'none';
    }
}

export default SpinnerView;
