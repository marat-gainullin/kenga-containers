import Ui from 'kenga/utils';
import Container from 'kenga/container';

class Scroll extends Container {
    constructor(view) {
        super();

        const self = this;

        this.element.classList.add('p-scroll');
        this.element.classList.add('p-vertical-scroll-filler');
        this.element.classList.add('p-horizontal-scroll-filler');
        /**
         * Used to set the horizontal scroll bar policy so that horizontal
         * scrollbars are displayed only when needed.
         */
        const SCROLLBAR_AS_NEEDED = 30;
        /**
         * Used to set the horizontal scroll bar policy so that horizontal
         * scrollbars are never displayed.
         */
        const SCROLLBAR_NEVER = 31;
        /**
         * Used to set the horizontal scroll bar policy so that horizontal
         * scrollbars are always displayed.
         */
        const SCROLLBAR_ALWAYS = 32;

        let verticalScrollBarPolicy = SCROLLBAR_AS_NEEDED;
        let horizontalScrollBarPolicy = SCROLLBAR_AS_NEEDED;
        this.element.style.overflowX = 'auto';
        this.element.style.overflowY = 'auto';

        Object.defineProperty(this, 'horizontalScrollBarPolicy', {
            get: function () {
                return verticalScrollBarPolicy;
            },
            set: function (aValue) {
                verticalScrollBarPolicy = aValue;
                applyHorizontalScrollBarPolicy();
            }
        });

        Object.defineProperty(this, 'verticalScrollBarPolicy', {
            get: function () {
                return horizontalScrollBarPolicy;
            },
            set: function (aValue) {
                horizontalScrollBarPolicy = aValue;
                applyVerticalScrollBarPolicy();
            }
        });

        function isHorizontalScrollFiller(w) {
            return w.element.className.includes('p-horizontal-scroll-filler');
        }

        function isVerticalScrollFiller(w) {
            return w.element.className.includes('p-vertical-scroll-filler');
        }

        function ajustWidth(w, aValue) {
            if (!isHorizontalScrollFiller(w)) {
                w.element.style.width = `${aValue}px`;
            }
        }
        Object.defineProperty(this, 'ajustWidth', {
            get: function () {
                return ajustWidth;
            }
        });

        function ajustHeight(w, aValue) {
            if (!isVerticalScrollFiller(w)) {
                w.element.style.height = `${aValue}px`;
            }
        }
        Object.defineProperty(this, 'ajustHeight', {
            get: function () {
                return ajustHeight;
            }
        });

        const superAdd = this.add;
        const superRemove = this.remove;

        function setView(w) {
            if (view) {
                superRemove(view);
            }
            view = w;
            if (view) {
                superAdd(w);
            }
            applyHorizontalScrollBarPolicy();
            applyVerticalScrollBarPolicy();
        }

        if (view) {
            setView(view);
        }

        function applyHorizontalScrollBarPolicy() {
            let value = 'auto';
            if (horizontalScrollBarPolicy === SCROLLBAR_ALWAYS) {
                value = 'scroll';
            } else if (horizontalScrollBarPolicy === SCROLLBAR_NEVER) {
                value = 'hidden';
            }
            if (view && view.element.className.includes('p-scroll')) {
                value = 'hidden';
            }
            self.element.style.overflowX = value;
        }

        function applyVerticalScrollBarPolicy() {
            let value = 'auto';
            if (verticalScrollBarPolicy === SCROLLBAR_ALWAYS) {
                value = 'scroll';
            } else if (verticalScrollBarPolicy === SCROLLBAR_NEVER) {
                value = 'hidden';
            }
            if (view && view.element.className.includes('p-scroll')) {
                value = 'hidden';
            }
            self.element.style.overflowY = value;
        }

        function add(w) {
            if (w) {
                if (w.parent === self)
                    throw 'A widget already added to this container';
                setView(w);
            }
        }
        Object.defineProperty(this, 'add', {
            get: function () {
                return add;
            }
        });

        function remove(widgetOrIndex) {
            if ((widgetOrIndex === 0 && view) || widgetOrIndex === view) {
                const removed = view;
                setView(null);
                return removed;
            }
        }
        Object.defineProperty(this, 'remove', {
            get: function () {
                return remove;
            }
        });
        
        function clear(){
            setView(null);
        }
        Object.defineProperty(this, 'clear', {
            get: function () {
                return clear;
            }
        });

        Object.defineProperty(this, 'view', {
            get: function () {
                return view;
            },
            set: function (aValue) {
                if (view !== aValue) {
                    setView(aValue);
                }
            }
        });

        function ajustTop(w) {}
        Object.defineProperty(this, 'ajustTop', {
            get: function () {
                return ajustTop;
            }
        });

        function ajustLeft(w) {}
        Object.defineProperty(this, 'ajustLeft', {
            get: function () {
                return ajustLeft;
            }
        });

    }
}

export default Scroll;