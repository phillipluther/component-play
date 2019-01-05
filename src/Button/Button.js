import Component from '../Component';
import styles from './button.css';

export default class Button extends Component {
    constructor() {
        super();

        this.template = `
            <style>${styles}</style>
            <slot></slot>
        `;

        this.setAttribute('role', 'button');
    }
}

window.customElements.define('x-button', Button);
