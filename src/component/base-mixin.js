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

    // inspired (blatantly ripping off?) the awesome classnames module; applies the given CSS
    // classes to the element. also accepts objects whose keys are class names and values evaluate
    // to a boolean - if TRUE, the key class is applied.
    classNames(...classes) {
        let classesToAdd = [];

        classes.forEach(classObj => {
            // simple class name; apply it outright
            if (typeof classObj === 'string') {
                classesToAdd.push(classObj);

            } else if (typeof classObj === 'object') {
                Object.keys(classObj).forEach(className => {
                    if (classObj[className] === true) {
                        classesToAdd.push(className);
                    }
                });
            }
        });

        this.classList.add(...classesToAdd);
    }

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
