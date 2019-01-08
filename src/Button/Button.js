import {BaseMixin, ClickableMixin, FocusableMixin} from '../component';


const ButtonBase = BaseMixin(
    FocusableMixin(
        ClickableMixin(HTMLButtonElement)));

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

        this.classNames('xButton', {
            'xButton--primary': this.getAttribute('variant') === 'primary',
            'xButton--disabled': this.hasAttribute('disabled')
        });

        this.defaultAttributes({
            role: 'presentation',
            type: 'button'
        });
    }
}

window.customElements.define('x-button', Button, { extends: 'button' });
