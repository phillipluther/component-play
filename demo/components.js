
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
    'use strict';

    class Component extends HTMLElement {

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

    const BUTTON_STYLES = {
        common: `
        button {
            position: relative;
            border: 1px solid;
            border-radius: 3px;
            font-family: sans-serif;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
            transition: background 180ms, border-color 180ms;
        }

        button[disabled],
        button[disabled]:hover {
            box-shadow: none;
            background: #f0f0f0;
            border-color: #b9b9b9;
            color: #a9a9a9;
        }
    `,
        basic: `
        button {
            border-color: #b9b9b9;
            background: white;
            color: #191919;
        }

        button:hover {
            background: #f9f9f9;
        }
    `,
        primary: `
        button {
            border-color: #456789;
            background: #456789;
            color: #fff;
        }

        button:hover {
            background: #123456;
            border-color: #123456;
        }
    `,
        large: `
        button {
            padding: 1.2rem 1.44rem;
            font-size: 1.2rem;
        }
    `,
        normal: `
        button {
            padding: 0.833rem 1rem;
            font-size: 1rem;
        }
    `,
        small: `
        button {
            padding: 0.579rem;
            font-size: 0.833rem;
        }
    `
    };

    customElements.define('p-button', class extends Component {
        static get observedAttributes() {
            return ['disabled'];
        }

        get disabled() {
            return this._disabled;
        }

        set disabled(isDisabled) {
            if (isDisabled) {
                this._el.setAttribute('disabled', '');
            } else {
                this._el.removeAttribute('disabled');
            }

            this._disabled = isDisabled;
        }

        set onClick(callback) {
            this._onClick = callback;

            if (this._isListening === false) {
                this.addEventListener('click', this.handleClick.bind(this));
                this._isListening = true;
            }
        }

        handleClick(e) {
            this._onClick(e);
        }

        constructor() {
            super();
            let {common, basic, primary, small, normal, large} = BUTTON_STYLES;
            let styles = common;
            let button = this._el = document.createElement('button');
            button.innerHTML = this.innerHTML;

            styles += this.hasAttribute('primary') ? primary : basic;

            if (this.hasAttribute('small')) {
                styles += small;
            } else if (this.hasAttribute('large')) {
                styles += large;
            } else {
                styles += normal;
            }

            this.style(styles);

            this._isListening = false;
            this._disabled = this.hasAttribute('disabled');
            this.root.appendChild(button);
        }

        attributeChangedCallback(name, previousVal, newVal) {
            if ((name === 'disabled') && (previousVal === null)) {
                this.disabled = true;
            } else {
                this.disabled = false;
            }
        }
    });

    const CARD_TEMPLATE = document.createElement('template');
    CARD_TEMPLATE.innerHTML = `
    <div class="card">
        <slot class="card-image" name="image"></slot>
        <slot class="card-title" name="title"></slot>
        <slot>Card content</slot>
        <slot class="card-link" name="link"></slot>
    </div>
`;

    const CARD_STYLES = {
        common: `
        .card {
            display: flex;
            flex-direction: column;
            background: white;
            padding: 1.728rem;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
        }

        .card-title::slotted(*) {
            color: darkgreen;
            margin-top: 0;
        }

        .card-image::slotted(*) {
            display: block;
            width: 100%;
            max-height: 12rem;
            margin-bottom: 1.5rem;
        }

        .card-link::slotted(*) {
            margin-bottom: 0;
            color: #456789;
        }

        .card-link::slotted(*):hover {
            color: #123456;
        }
    `,
        centered: `
        .card { align-items: center; }
    `,
        left: `
        .card { align-items: left; }
    `
    };

    customElements.define('p-card', class extends Component {
        constructor() {
            super();

            let {common, centered, left} = CARD_STYLES;
            let styles = common;

            styles += this.getAttribute('align') === 'left' ? left : centered;

            this.style(styles);
            this.root.appendChild(CARD_TEMPLATE.content.cloneNode(true));
        }
    });

}());
