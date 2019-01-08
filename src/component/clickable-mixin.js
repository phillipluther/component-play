import BaseMixin from './base-mixin';
import addEventListener from './add-event-listener';


export default ParentClass => class extends BaseMixin(ParentClass) {
    onClick(callback) {
        addEventListener('click', this, callback);
    }

    constructor() {
        super();

        this.defaultAttributes({
            tabindex: 0
        });
    }
}
