import Component from '../Component';
import styles from './button.css';


export default class Button extends Component {

    static get observedAttributes() {
        return ['disabled', 'tabindex'];
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(isDisabled) {
        if (isDisabled) {
            this.setAttributes({
                'aria-disabled': true,
                disabled: ''
            });

        } else {
            this.setAttributes({
                'aria-disabled': false
            });

            this.removeAttribute('disabled');
        }
    }

    attributeChangedCallback(attrName, previousVal, newVal) {
        if ((attrName === 'disabled') && (previousVal !== null)) {
            // console.log('previous', previousVal, newVal);
            console.log('NAME:', attrName, 'PREV:', previousVal, 'NEW:', newVal)
            // this.disabled = newVal;
        }
    }

    constructor() {
        super();

        this.template = `
            <style>${styles}</style>
            <slot></slot>
        `;

        if (this.hasAttribute('disabled')) {
            this.disabled = true;
        }

        this.setAttributes({
            role: 'button',
            tabindex: this.hasAttribute('tabindex') ? this.getAttribute('tabindex') : 0
        });
    }
}

window.customElements.define('x-button', Button);
