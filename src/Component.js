export default class extends HTMLElement {

    style(css) {
        let style = document.createElement('style');
        style.textContent = css;

        this.root.appendChild(style);
    }

    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });
    }
}
