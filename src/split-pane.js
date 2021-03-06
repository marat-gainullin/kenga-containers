import Id from 'septima-utils/id';
import Ui from 'kenga/utils';
import Container from 'kenga/container';

class Split extends Container {
    constructor(orientation) {
        if (arguments.length < 1)
            orientation = Ui.Orientation.HORIZONTAL;

        super();

        const self = this;

        let dividerSize = 10;

        let first;
        let second;

        let oneTouchExpandable;
        let dividerLocation = 0;

        this.element.classList.add('p-split');

        this.element.id = `p-${Id.next()}`;

        const style = document.createElement('style');
        self.element.appendChild(style);

        const superAdd = this.add;
        const superRemove = this.remove;

        function formatChildren() {
            if (orientation === Ui.Orientation.HORIZONTAL) {
                self.element.classList.remove('p-split-vertical');
                self.element.classList.add('p-split-horizontal');

                style.innerHTML =
                        // first
                        // second
                        `div#${self.element.id} > .p-widget:nth-child(2) {position: absolute;left: ${0}px;top: ${0}px;bottom: ${0}px;width: ${dividerLocation}px;}div#${self.element.id} > .p-widget:last-child {position: absolute;right: ${0}px;top: ${0}px;bottom: ${0}px;left: ${dividerLocation + dividerSize}px;}`;
                divider.style.top = '0px';
                divider.style.bottom = '0px';
                divider.style.width = `${dividerSize}px`;
                divider.style.left = `${dividerLocation}px`;
                divider.style.height = '';
                divider.style.right = '';
            } else {
                self.element.classList.remove('p-split-horizontal');
                self.element.classList.add('p-split-vertical');

                style.innerHTML =
                        // first
                        // second
                        `div#${self.element.id} > .p-widget:nth-child(2) {position: absolute;left: ${0}px;right: ${0}px;top: ${0}px;height: ${dividerLocation}px;}div#${self.element.id} > .p-widget:last-child {position: absolute;left: ${0}px;right: ${0}px;bottom: ${0}px;top: ${dividerLocation + dividerSize}px;}`;
                divider.style.left = '0px';
                divider.style.right = '0px';
                divider.style.height = `${dividerSize}px`;
                divider.style.top = `${dividerLocation}px`;
                divider.style.width = '';
                divider.style.bottom = '';
            }
        }

        const divider = document.createElement('div');
        divider.classList.add('p-split-divider');
        divider.style.position = 'absolute';
        this.element.appendChild(divider);

        ((() => {
            let mouseDownAt = null;
            let mouseDownDividerAt = null;
            let onMouseUp = null;
            let onMouseMove = null;
            Ui.on(divider, Ui.Events.DRAGSTART, event => {
                if (event.button === 0) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
            Ui.on(divider, Ui.Events.MOUSEDOWN, event => {
                if (event.button === 0) {
                    event.stopPropagation();
                    if (orientation === Ui.Orientation.HORIZONTAL) {
                        mouseDownAt = event.clientX;
                    } else {
                        mouseDownAt = event.clientY;
                    }
                    mouseDownDividerAt = dividerLocation;
                    if (!onMouseUp) {
                        onMouseUp = Ui.on(document, Ui.Events.MOUSEUP, event => {
                            event.stopPropagation();
                            if (onMouseUp) {
                                onMouseUp.removeHandler();
                                onMouseUp = null;
                            }
                            if (onMouseMove) {
                                onMouseMove.removeHandler();
                                onMouseMove = null;
                            }
                        });
                    }
                    if (!onMouseMove) {
                        onMouseMove = Ui.on(document, Ui.Events.MOUSEMOVE, event => {
                            event.stopPropagation();
                            event.preventDefault();
                            let mouseDiff;
                            if (orientation === Ui.Orientation.HORIZONTAL) {
                                mouseDiff = event.clientX - mouseDownAt;
                            } else {
                                mouseDiff = event.clientY - mouseDownAt;
                            }
                            self.dividerLocation = mouseDownDividerAt + mouseDiff;
                        });
                    }
                }
            });
        })());

        formatChildren();

        function checkAdd(w) {
            if (!first) {
                first = w;
                self.element.insertBefore(first.element, divider);
            } else {
                if (second) {
                    superRemove(second);
                }
                second = w;
                self.element.appendChild(second.element);
            }
        }

        function add(w, beforeIndex) {
            if (w) {
                if (w.parent === self)
                    throw 'A widget already added to this container';
                superAdd(w, beforeIndex);
                checkAdd(w);
            }
        }
        Object.defineProperty(this, 'add', {
            get: function () {
                return add;
            }
        });

        function checkRemove(w) {
            if (w === first) {
                first = null;
            }
            if (w === second) {
                second = null;
            }
        }

        function remove(w) {
            const removed = superRemove(w);
            checkRemove(removed);
            return removed;
        }
        Object.defineProperty(this, 'remove', {
            get: function () {
                return remove;
            }
        });

        const superClear = this.clear;

        function clear() {
            first = null;
            second = null;
            superClear();
        }
        Object.defineProperty(this, 'clear', {
            get: function () {
                return clear;
            }
        });

        Object.defineProperty(this, 'orientation', {
            get: function () {
                return orientation;
            },
            set: function (aValue) {
                if (orientation !== aValue) {
                    orientation = aValue;
                    formatChildren();
                }
            }
        });
        Object.defineProperty(this, 'first', {
            get: function () {
                return first;
            },
            set: function (aFirst) {
                if (first !== aFirst) {
                    if (first) {
                        superRemove(first);
                    }
                    first = aFirst;
                    if (first) {
                        superAdd(first);
                        self.element.insertBefore(first.element, divider);
                    }
                }
            }
        });
        Object.defineProperty(this, 'second', {
            get: function () {
                return second;
            },
            set: function (aSecond) {
                if (second !== aSecond) {
                    if (second) {
                        superRemove(second);
                    }
                    second = aSecond;
                    if (second) {
                        superAdd(second);
                        self.element.appendChild(second.element);
                    }
                }
            }
        });
        Object.defineProperty(this, 'dividerLocation', {
            get: function () {
                return dividerLocation;
            },
            set: function (aValue) {
                if (dividerLocation !== aValue) {
                    aValue = +aValue;
                    if (aValue >= 0) {
                        dividerLocation = aValue;
                        formatChildren();
                    }
                }
            }
        });
        Object.defineProperty(this, 'dividerSize', {
            get: function () {
                return dividerSize;
            },
            set: function (aValue) {
                if (dividerSize !== aValue) {
                    aValue = +aValue;
                    if (aValue > 0 && aValue <= 100) {
                        dividerSize = aValue;
                        formatChildren();
                    }
                }
            }
        });
        Object.defineProperty(this, 'oneTouchExpandable', {
            get: function () {
                return oneTouchExpandable;
            },
            set: function (aValue) {
                if (oneTouchExpandable !== aValue) {
                    oneTouchExpandable = aValue;
                }
            }
        });

        function ajustLeft(w, aValue) {}
        Object.defineProperty(this, 'ajustLeft', {
            get: function () {
                return ajustLeft;
            }
        });

        function ajustWidth(w, aValue) {}
        Object.defineProperty(this, 'ajustWidth', {
            get: function () {
                return ajustWidth;
            }
        });

        function ajustTop(w, aValue) {}
        Object.defineProperty(this, 'ajustTop', {
            get: function () {
                return ajustTop;
            }
        });

        function ajustHeight(w, aValue) {}
        Object.defineProperty(this, 'ajustHeight', {
            get: function () {
                return ajustHeight;
            }
        });
    }
}

export default Split;