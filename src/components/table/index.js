window.customElements.define('p-table', class extends HTMLTableElement {
    connectedCallback() {
        this.classList.add('pTable');
    }

}, { extends: 'table' });
