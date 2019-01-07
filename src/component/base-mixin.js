import addEventListener from './add-event-listener';


function setKeyboardActive() {
    document.body.classList.add('xKeyboardActive');

    keyboardActiveListener.deactivate();
    keyboardInactiveListener.activate();
}

function setKeyboardInactive() {
    document.body.classList.remove('xKeyboardActive');

    keyboardInactiveListener.deactivate();
    keyboardActiveListener.activate();
}

let keyboardActiveListener = addEventListener('keydown', { key: 'Tab'}, setKeyboardActive);
let keyboardInactiveListener = addEventListener('mousedown', window, setKeyboardInactive, {
    inactive: true
});

export default ParentClass => class extends ParentClass {

    // takes an object of key/val pairs to set base attributes on the element; if the user specifies
    // an attribute, the default will not apply
    defaultAttributes(attributeObj) {
        Object.keys(attributeObj).forEach(name => {
            let defaultVal = attributeObj[name];
            let userVal = this.getAttribute(name);

            if (!userVal) {
                this.setAttribute(name, defaultVal);
            }
        });
    }
}
