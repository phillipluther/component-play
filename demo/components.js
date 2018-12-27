
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
    'use strict';

    // performs a given iterator on each member of an array; if the member is a function, it's invoked
    // and the iterator is performed on the result
    function invokeEach(arr, iterator) {
        arr.forEach(item => {
            if (typeof item === 'function') {
                item = item();
            }

            iterator(item);
        });
    }

    class Component extends HTMLElement {
        append(...children) {
            invokeEach(children, this.root.appendChild);
            return this;
        }

        onChange(stateAttr, callback) {
            if (!this.watchers[stateAttr]) {
                this.watchers[stateAttr] = [];
            }

            this.watchers[stateAttr].push(() => {
                callback(this.state[stateAttr], this.state);
            });
        }

        style(css) {
            let style = document.createElement('style');
            style.textContent = css;

            this.root.appendChild(style);

            return this;
        }

        constructor(defaultState = {}) {
            super();

            this.root = this.attachShadow({ mode: 'open' });
            this.state = Object.assign({}, defaultState);
            this.watchers = {};

            // basic CSS reset applied to components
            this.style(`
            border: 0;
            margin: 0;
            padding: 0;
            font: inherit;
            vertical-align: baseline;
        `);
        }
    }

    window.customElements.define('p-button', class extends Component {
        constructor(state = {}) {
            super(state);

            console.log('This', this);
        }
    });

}());
