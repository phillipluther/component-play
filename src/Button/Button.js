import {BaseMixin, FocusableMixin} from '../Component';


const ButtonBase = BaseMixin(FocusableMixin(HTMLButtonElement));

export default class Button extends ButtonBase {

    connectedCallback() {
    }

    constructor() {
        super();

        this.classList.add('xButton');
        // this.test();

        console.log('NAME', this.constructor.name);
        this.baseTest();
        this.focusableTest();

        this.defaultAttributes({
            role: 'presentation'
        });
    }
}

window.customElements.define('x-button', Button, { extends: 'button' });
