const TEMPLATES = {};

export default class Component extends HTMLElement {

    get template() {
        return TEMPLATES[this.constructor.name];
    }

    set template(markup) {
        let componentName = this.constructor.name;

        if (!TEMPLATES[componentName]) {
            let template = document.createElement('template');
            template.innerHTML = markup;

            TEMPLATES[componentName] = template;
        }
    }

    setAttributes(attributes) {
        Object.keys(attributes).forEach(attrName => {
            this.setAttribute(attrName, attributes[attrName]);
        });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
}
