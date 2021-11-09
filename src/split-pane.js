import Ui from 'kenga/utils';
import Container from 'kenga/container';
import ChangeEvent from './events/change-event';

class Split extends Container {
    constructor(orientation) {
        if (arguments.length < 1)
            orientation = Ui.Orientation.HORIZONTAL;

        super();

        const self = this;

        let first;
        let second;

        let collapsed = false
        let expanded = false

        let expandable = false;
        let collapsible = false;
        let prevDividerLocation = '50%';
        let dividerLocation = '50%';

        this.element.classList.add('p-split', 'p-split-restored');

        this.element.id = `p-${Ui.next()}`;

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
                    `div#${self.element.id} > .p-widget:nth-child(2) {position: absolute;left: 0px;top: 0px;bottom: 0px;width: ${dividerLocation};}div#${self.element.id} > .p-widget:last-child {position: absolute;right: 0px;top: 0px;bottom: 0px;left: ${dividerLocation};}`;
                divider.style.top = '0px';
                divider.style.bottom = '0px';
                divider.style.left = dividerLocation;
                divider.style.height = '';
                divider.style.right = '';
            } else {
                self.element.classList.remove('p-split-horizontal');
                self.element.classList.add('p-split-vertical');

                style.innerHTML =
                    // first
                    // second
                    `div#${self.element.id} > .p-widget:nth-child(2) {position: absolute;left: 0px;right: 0px;top: 0px;height: ${dividerLocation};}div#${self.element.id} > .p-widget:last-child {position: absolute;left: 0px;right: 0px;bottom: 0px;top: ${dividerLocation};}`;
                divider.style.left = '0px';
                divider.style.right = '0px';
                divider.style.top = dividerLocation;
                divider.style.width = '';
                divider.style.bottom = '';
            }
        }

        const divider = document.createElement('div');
        divider.classList.add('p-split-divider');
        divider.style.position = 'absolute';
        this.element.appendChild(divider);

        const dividerCollapse = document.createElement('div');
        dividerCollapse.style.display = 'none';
        dividerCollapse.classList.add('p-split-divider-collapse');
        divider.appendChild(dividerCollapse);

        const dividerExpand = document.createElement('div');
        dividerExpand.style.display = 'none';
        dividerExpand.classList.add('p-split-divider-expand');
        divider.appendChild(dividerExpand);

        Ui.on(dividerCollapse, Ui.Events.MOUSEDOWN, event => {
            if (event.button === 0) {
                event.stopPropagation();
            }
        });
        Ui.on(dividerCollapse, Ui.Events.CLICK, event => {
            if (collapsed) {
                restore()
            } else {
                collapse()
            }
        });

        Ui.on(dividerExpand, Ui.Events.MOUSEDOWN, event => {
            if (event.button === 0) {
                event.stopPropagation();
            }
        });
        Ui.on(dividerExpand, Ui.Events.CLICK, event => {
            if (expanded) {
                restore()
            } else {
                expand()
            }
        });

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
                if (event.button === 0 && first) {
                    event.stopPropagation();
                    if (orientation === Ui.Orientation.HORIZONTAL) {
                        mouseDownAt = event.clientX;
                        mouseDownDividerAt = first.element.offsetWidth;
                    } else {
                        mouseDownDividerAt = first.element.offsetHeight;
                        mouseDownAt = event.clientY;
                    }
                    divider.style.transitionDuration = '0s'
                    if (first) {
                        first.element.style.transitionDuration = '0s'
                    }
                    if (second) {
                        second.element.style.transitionDuration = '0s'
                    }
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
                            divider.style.transitionDuration = ''
                            if (first) {
                                first.element.style.transitionDuration = ''
                            }
                            if (second) {
                                second.element.style.transitionDuration = ''
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
                            if (collapsed || expanded) {
                                prevDividerLocation = `${mouseDownDividerAt + mouseDiff}px`;
                                restore()
                            }
                            self.dividerLocation = `${Math.min(self.element.clientWidth, Math.max(0, mouseDownDividerAt + mouseDiff))}px`;
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
                    const oldValue = dividerLocation;
                    dividerLocation = typeof aValue === 'number' ? `${aValue}px` : aValue;
                    formatChildren();
                    fireDividerLocationChanged(oldValue, dividerLocation)
                }
            }
        });
        Object.defineProperty(this, 'expandable', {
            get: function () {
                return expandable;
            },
            set: function (aValue) {
                if (expandable !== aValue) {
                    expandable = aValue;
                    dividerExpand.style.display = expandable ? '' : 'none'
                }
            }
        });
        Object.defineProperty(this, 'expanded', {
            get: function () {
                return expanded;
            }
        });
        Object.defineProperty(this, 'collapsible', {
            get: function () {
                return collapsible;
            },
            set: function (aValue) {
                if (collapsible !== aValue) {
                    collapsible = aValue;
                    dividerCollapse.style.display = collapsible ? '' : 'none'
                }
            }
        });
        Object.defineProperty(this, 'collapsed', {
            get: function () {
                return collapsed;
            }
        });

        function ajustLeft(w, aValue) {
        }

        Object.defineProperty(this, 'ajustLeft', {
            get: function () {
                return ajustLeft;
            }
        });

        function ajustWidth(w, aValue) {
        }

        Object.defineProperty(this, 'ajustWidth', {
            get: function () {
                return ajustWidth;
            }
        });

        function ajustTop(w, aValue) {
        }

        Object.defineProperty(this, 'ajustTop', {
            get: function () {
                return ajustTop;
            }
        });

        function ajustHeight(w, aValue) {
        }

        Object.defineProperty(this, 'ajustHeight', {
            get: function () {
                return ajustHeight;
            }
        });

        Object.defineProperty(this, 'expander', {
            get: function () {
                return dividerExpand;
            }
        });

        Object.defineProperty(this, 'collapser', {
            get: function () {
                return dividerCollapse;
            }
        });

        function collapse() {
            prevDividerLocation = self.dividerLocation;
            collapsed = true;
            expanded = false;
            self.dividerLocation = '0px';
            self.element.classList.remove('p-split-restored')
            self.element.classList.add('p-split-collapsed')
            fireCollapsed();
        }

        Object.defineProperty(this, 'collapse', {
            get: function () {
                return collapse;
            }
        });

        function expand() {
            prevDividerLocation = self.dividerLocation;
            collapsed = false;
            expanded = true;
            self.dividerLocation = '100%'
            self.element.classList.remove('p-split-restored')
            self.element.classList.add('p-split-expanded')
            fireExpanded();
        }

        Object.defineProperty(this, 'expand', {
            get: function () {
                return expand;
            }
        });

        function restore() {
            collapsed = false;
            expanded = false;
            self.element.classList.add('p-split-restored')
            self.element.classList.remove('p-split-collapsed')
            self.element.classList.remove('p-split-expanded')
            fireRestored();
            self.dividerLocation = prevDividerLocation;
        }

        Object.defineProperty(this, 'restore', {
            get: function () {
                return restore;
            }
        });

        const dividerLocationChangeHandlers = new Set();

        function addDividerLocationChangeHandler(handler) {
            dividerLocationChangeHandlers.add(handler);
            return {
                removeHandler: function () {
                    dividerLocationChangeHandlers.delete(handler);
                }
            };
        }

        Object.defineProperty(this, 'addDividerLocationChangeHandler', {
            get: function () {
                return addDividerLocationChangeHandler;
            }
        });

        function fireDividerLocationChanged(oldValue, aValue) {
            const event = new ChangeEvent(self, oldValue, aValue);
            dividerLocationChangeHandlers.forEach(h => {
                Ui.later(() => {
                    h(event);
                });
            });
        }

        Object.defineProperty(this, 'fireDividerLocationChanged', {
            get: function () {
                return fireDividerLocationChanged;
            }
        });
        let onDividerLocationChange;
        let onDividerLocationChangeReg;
        Object.defineProperty(this, 'onDividerLocationChange', {
            get: function () {
                return onDividerLocationChange;
            },
            set: function (aValue) {
                if (onDividerLocationChange !== aValue) {
                    if (onDividerLocationChangeReg) {
                        onDividerLocationChangeReg.removeHandler();
                        onDividerLocationChangeReg = null;
                    }
                    onDividerLocationChange = aValue;
                    if (onDividerLocationChange && addDividerLocationChangeHandler) {
                        onDividerLocationChangeReg = addDividerLocationChangeHandler(event => {
                            if (onDividerLocationChange) {
                                onDividerLocationChange(event);
                            }
                        });

                    }
                }
            }
        });

        const expandHandlers = new Set();

        function addExpandHandler(handler) {
            expandHandlers.add(handler);
            return {
                removeHandler: function () {
                    expandHandlers.delete(handler);
                }
            };
        }

        Object.defineProperty(this, 'addExpandHandler', {
            get: function () {
                return addExpandHandler;
            }
        });

        function fireExpanded() {
            const event = new ChangeEvent(self, dividerLocation, dividerLocation);
            expandHandlers.forEach(h => {
                Ui.later(() => {
                    h(event);
                });
            });
        }

        Object.defineProperty(this, 'fireExpanded', {
            get: function () {
                return fireExpanded;
            }
        });
        let onExpanded;
        let onExpandedChangeReg;
        Object.defineProperty(this, 'onExpanded', {
            get: function () {
                return onExpanded;
            },
            set: function (aValue) {
                if (onExpanded !== aValue) {
                    if (onExpandedChangeReg) {
                        onExpandedChangeReg.removeHandler();
                        onExpandedChangeReg = null;
                    }
                    onExpanded = aValue;
                    if (onExpanded) {
                        onExpandedChangeReg = addExpandHandler(event => {
                            if (onExpanded) {
                                onExpanded(event);
                            }
                        });

                    }
                }
            }
        });

        const collapseHandlers = new Set();

        function addCollapseHandler(handler) {
            collapseHandlers.add(handler);
            return {
                removeHandler: function () {
                    collapseHandlers.delete(handler);
                }
            };
        }

        Object.defineProperty(this, 'addCollapseHandler', {
            get: function () {
                return addCollapseHandler;
            }
        });

        function fireCollapsed() {
            const event = new ChangeEvent(self, dividerLocation, dividerLocation);
            collapseHandlers.forEach(h => {
                Ui.later(() => {
                    h(event);
                });
            });
        }

        Object.defineProperty(this, 'fireCollapsed', {
            get: function () {
                return fireCollapsed;
            }
        });
        let onCollapsed;
        let onCollapsedChangeReg;
        Object.defineProperty(this, 'onCollapsed', {
            get: function () {
                return onCollapsed;
            },
            set: function (aValue) {
                if (onCollapsed !== aValue) {
                    if (onCollapsedChangeReg) {
                        onCollapsedChangeReg.removeHandler();
                        onCollapsedChangeReg = null;
                    }
                    onCollapsed = aValue;
                    if (onCollapsed) {
                        onCollapsedChangeReg = addCollapseHandler(event => {
                            if (onCollapsed) {
                                onCollapsed(event);
                            }
                        });

                    }
                }
            }
        });

        const restoreHandlers = new Set();

        function addRestoreHandler(handler) {
            restoreHandlers.add(handler);
            return {
                removeHandler: function () {
                    restoreHandlers.delete(handler);
                }
            };
        }

        Object.defineProperty(this, 'addRestoreHandler', {
            get: function () {
                return addRestoreHandler;
            }
        });

        function fireRestored() {
            const event = new ChangeEvent(self, dividerLocation, dividerLocation);
            restoreHandlers.forEach(h => {
                Ui.later(() => {
                    h(event);
                });
            });
        }

        Object.defineProperty(this, 'fireRestored', {
            get: function () {
                return fireRestored;
            }
        });
        let onRestored;
        let onRestoredChangeReg;
        Object.defineProperty(this, 'onRestored', {
            get: function () {
                return onRestored;
            },
            set: function (aValue) {
                if (onRestored !== aValue) {
                    if (onRestoredChangeReg) {
                        onRestoredChangeReg.removeHandler();
                        onRestoredChangeReg = null;
                    }
                    onRestored = aValue;
                    if (onRestored) {
                        onRestoredChangeReg = addRestoreHandler(event => {
                            if (onRestored) {
                                onRestored(event);
                            }
                        });

                    }
                }
            }
        });
    }
}

export default Split;