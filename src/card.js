import Component from './Component';

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
