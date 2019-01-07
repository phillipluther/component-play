const CACHE = {};

function dispatch(e) {
    let { target: eventTarget, type: eventType } = e;
    let eventCache = CACHE[eventType];

    eventCache.forEach(handler => {
        let { active, callback, scope, target: handlerTarget } = handler;
        let isMatch = false;
        let isWindowHandlerTarget = handlerTarget === window;
        let isWindowEventTarget = eventTarget === window;

        if (active === false) {
            return;
        }

        // we can optionally scope our events to specific DOM nodes; if no scope is provided,
        // any matched target is valid
        let isInScope = scope ? scope.contains(eventTarget) : true;

        // handler target is a string; treat it as a query selector
        if (isInScope && typeof handlerTarget === 'string') {
            let isSelectorMatch = eventTarget.matches(handlerTarget);
            isMatch = isSelectorMatch;

        // one of the targets is the window; if it's the event, handler target must be window to
        // match. if it's the handler, no matching is needed
        } else if (isWindowHandlerTarget || isWindowEventTarget) {
            isMatch = isWindowHandlerTarget || isWindowHandlerTarget && isWindowEventTarget;

        // handler target is a specific DOM node
        } else if (handlerTarget instanceof Element) {
            isMatch = handlerTarget.isEqualNode(eventTarget);

        // handler target is a key/val description of the event itself; all properties must match
        } else if (isInScope && typeof handlerTarget === 'object') {
            let allMatch = true;

            Object.keys(handlerTarget).forEach(property => {
                if (handlerTarget[property] !== e[property]) {
                    allMatch = false;
                }
            });

            isMatch = allMatch;
        }

        if (isMatch) {
            callback(e);
        }
    });
}

export default (eventType, target, callback, options = {}) => {
    if (!CACHE[eventType]) {
        CACHE[eventType] = [];
        window.addEventListener(eventType, dispatch, true);
    }

    let { inactive, scope } = options;
    let handler = {
        active: inactive !== true,
        callback,
        scope,
        target
    };

    CACHE[eventType].push(handler);

    return {
        activate: () => {
            console.log('Activating');
            handler.active = true;
        },
        deactivate: () => {
            console.log('Deactivating');
            handler.active = false;
        }
    };
};
