import Ui from 'kenga/utils';
import Widget from 'kenga/widget';
import SelectionEvent from 'kenga/events/item-event';
import ContainerEvent from 'kenga/events/container-event';

class ButtonGroup {
    constructor() {
        const self = this;

        const selectionHandlers = new Set();

        function addSelectHandler(handler) {
            selectionHandlers.add(handler);
            return {
                removeHandler: function() {
                    selectionHandlers.delete(handler);
                }
            };
        }

        function fireSelected(aItem) {
            const event = new SelectionEvent(self, aItem);
            selectionHandlers.forEach(h => {
                Ui.later(() => {
                    h(event);
                });
            });
        }

        Object.defineProperty(this, 'addSelectHandler', {
            get: function() {
                return addSelectHandler;
            }
        });

        let onSelect;
        let selectReg;
        Object.defineProperty(this, 'onSelect', {
            get: function() {
                return onSelect;
            },
            set: function(aValue) {
                if (onSelect !== aValue) {
                    if (selectReg) {
                        selectReg.removeHandler();
                        selectReg = null;
                    }
                    onSelect = aValue;
                    if (onSelect) {
                        selectReg = addSelectHandler(event => {
                            if (onSelect) {
                                onSelect(event);
                            }
                        });
                    }
                }
            }
        });

        const children = [];

        Object.defineProperty(this, 'count', {
            get: function() {
                return children.length;
            }
        });

        function child(index) {
            if (index >= 0 && index < children.length) {
                return children[index];
            } else {
                return null;
            }
        }
        Object.defineProperty(this, 'child', {
            get: function() {
                return child;
            }
        });

        function _children() {
            return children.slice(0, children.length);
        }
        Object.defineProperty(this, 'children', {
            get: function() {
                return _children;
            }
        });

        function forEach(action) {
            children.forEach(action);
        }

        Object.defineProperty(this, 'forEach', {
            get: function() {
                return forEach;
            }
        });

        function indexOf(w) {
            return children.indexOf(w);
        }

        Object.defineProperty(this, 'indexOf', {
            get: function() {
                return indexOf;
            }
        });

        const valueChangeRegs = new Map();

        function add(w, beforeIndex) {
            if (w.buttonGroup !== self) {
                w.buttonGroup = self;
            } else {
                if (isNaN(beforeIndex)) {
                    children.push(w);
                } else {
                    children.splice(beforeIndex, 0, w);
                }
                if (w.addValueChangeHandler) {
                    const valueChangeReg = w.addValueChangeHandler(evt => {
                        if (evt.newValue) {
                            children.filter(item => item !== evt.source).forEach(item => {
                                item.value = false;
                            });
                            fireSelected(evt.source);
                        }
                    });
                    valueChangeRegs.set(w, valueChangeReg);
                }
                fireAdded(w);
            }
        }

        Object.defineProperty(this, 'add', {
            get: function() {
                return add;
            }
        });

        function remove(w) {
            let idx;
            if (w instanceof Widget)
                idx = children.indexOf(w);
            else
                idx = w;
            if (idx >= 0 && idx < children.length) {
                let removed = children[idx];
                if (removed.buttonGroup === self) {
                    removed.buttonGroup = null;
                } else {
                    removed = children.splice(idx, 1)[0];
                    const valueChangeReg = valueChangeRegs.get(removed);
                    valueChangeRegs.delete(removed);
                    if (valueChangeReg)
                        valueChangeReg.removeHandler();
                    fireRemoved(w);
                    return removed;
                }
            } else {
                return null;
            }
        }

        Object.defineProperty(this, 'remove', {
            get: function() {
                return remove;
            }
        });

        function clear() {
            const toRemove = _children();
            toRemove.forEach(child => {
                remove(child);
            });
        }

        Object.defineProperty(this, 'clear', {
            get: function() {
                return clear;
            }
        });

        const addHandlers = new Set();

        function addAddHandler(handler) {
            addHandlers.add(handler);
            return {
                removeHandler: function() {
                    addHandlers.delete(handler);
                }
            };
        }

        Object.defineProperty(this, 'addAddHandler', {
            get: function() {
                return addAddHandler;
            }
        });

        function fireAdded(w) {
            const event = new ContainerEvent(self, w);
            addHandlers.forEach(h => {
                Ui.later(() => {
                    h(event);
                });
            });
        }

        const removeHandlers = new Set();

        function addRemoveHandler(handler) {
            removeHandlers.add(handler);
            return {
                removeHandler: function() {
                    removeHandlers.delete(handler);
                }
            };
        }

        Object.defineProperty(this, 'addRemoveHandler', {
            get: function() {
                return addRemoveHandler;
            }
        });

        function fireRemoved(w) {
            const event = new ContainerEvent(self, w);
            removeHandlers.forEach(h => {
                Ui.later(() => {
                    h(event);
                });
            });
        }

        let onAdded;
        let addedReg;
        Object.defineProperty(this, 'onAdded', {
            get: function() {
                return onAdded;
            },
            set: function(aValue) {
                if (onAdded !== aValue) {
                    if (addedReg) {
                        addedReg.removeHandler();
                        addedReg = null;
                    }
                    onAdded = aValue;
                    if (onAdded) {
                        addedReg = addAddHandler(event => {
                            if (onAdded) {
                                onAdded(event);
                            }
                        });
                    }
                }
            }
        });

        let onRemoved;
        let removedReg;
        Object.defineProperty(this, 'onRemoved', {
            get: function() {
                return onRemoved;
            },
            set: function(aValue) {
                if (onRemoved !== aValue) {
                    if (removedReg) {
                        removedReg.removeHandler();
                        removedReg = null;
                    }
                    onRemoved = aValue;
                    if (onRemoved) {
                        removedReg = addRemoveHandler(event => {
                            if (onRemoved) {
                                onRemoved(event);
                            }
                        });
                    }
                }
            }
        });
    }
}

export default ButtonGroup;