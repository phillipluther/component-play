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

    baseTest() {
        console.log('OK');
    }
}
