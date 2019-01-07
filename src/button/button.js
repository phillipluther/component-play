import {BaseMixin, FocusableMixin} from '../component';


const ButtonBase = BaseMixin(FocusableMixin(HTMLButtonElement));

export default class Button extends ButtonBase {

    connectedCallback() {
        this.onFocus(() => {
            this.classList.add('xButton--focused');
        });

        this.onBlur(() => {
            this.classList.remove('xButton--focused');
        });
    }

    constructor() {
        super();

        this.classList.add('xButton');

        this.defaultAttributes({
            role: 'presentation',
            type: 'button'
        });
    }
}

window.customElements.define('x-button', Button, { extends: 'button' });
