window.customElements.define('p-button', class extends HTMLButtonElement {
    connectedCallback() {
        let classNames = ['pButton'];

        // size variants
        if (this.hasAttribute('large')) {
            classNames.push('pButton--large');
        } else if (this.hasAttribute('small')) {
            classNames.push('pButton--small');
        } else {
            classNames.push('pButton--medium');
        }

        if (this.hasAttribute('primary')) {
            classNames.push('pButton--primary');
        } else {
            classNames.push('pButton--basic');
        }

        this.classList.add(...classNames);
    }

}, { extends: 'button' });
