import addEventListener from './add-event-listener';


export default ParentClass => class extends ParentClass {
    onBlur(callback) {
        addEventListener('blur', this, callback);
    }

    onFocus(callback) {
        addEventListener('focus', this, callback);
    }
}
