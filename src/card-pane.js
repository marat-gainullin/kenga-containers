import Ui from 'kenga/utils';
import Container from 'kenga/container';
import SelectionEvent from 'kenga/events/item-event';

class Cards extends Container {
    constructor(hgap, vgap, shell, content) {
        if (!shell)
            shell = document.createElement('div');
        if (!content)
            content = shell;
        super(shell, content);

        const self = this;

        if (arguments.length < 2) {
            vgap = '0px';
        }
        if (arguments.length < 1) {
            vgap = '0px';
            hgap = '0px';
        }

        this.element.classList.add('p-cards');

        this.element.id = `p-${Ui.next()}`;

        const style = document.createElement('style');
        self.element.appendChild(style);

        function formatChildren() {
            style.innerHTML =
                `div#${self.element.id} > .p-widget {}`;
        }

        formatChildren();

        let selected;

        Object.defineProperty(this, 'hgap', {
            get: function () {
                return hgap;
            },
            set: function (aValue) {
                if (hgap !== aValue) {
                    hgap = typeof aValue === 'number' ? `${aValue}px` : aValue;
                    self.element.style.paddingLeft = self.element.style.paddingRight = hgap != null && hgap != '' ? `${hgap}` : '';
                }
            }
        });

        Object.defineProperty(this, 'vgap', {
            get: function () {
                return vgap;
            },
            set: function (aValue) {
                if (vgap !== aValue) {
                    vgap = typeof aValue === 'number' ? `${aValue}px` : aValue;
                    self.element.style.paddingTop = self.element.style.paddingBottom = vgap != null && vgap != '' ? `${vgap}` : '';
                }
            }
        });

        const superAdd = this.add;
        const superRemove = this.remove;

        function add(w, index = self.count) {
            if (w) {
                superAdd(w, index);
                w.element.style.display = 'none';
                if (!selected) {
                    show(w);
                }
            }
        }

        Object.defineProperty(this, 'add', {
            configurable: true,
            get: function () {
                return add;
            }
        });

        function remove(widgetOrIndex) {
            const removed = superRemove(widgetOrIndex);
            if (removed) {
                removed.element.style.display = '';
                if (selected === removed) {
                    if (self.count === 0) {
                        selected = null;
                    } else {
                        show(self.child(0));
                    }
                }
            }
            return removed;
        }

        Object.defineProperty(this, 'remove', {
            configurable: true,
            get: function () {
                return remove;
            }
        });

        const superClear = this.clear;

        function clear() {
            selected = null;
            self.forEach(w => {
                w.element.classList.remove('p-card-shown');
                w.element.style.display = '';
            });
            superClear();
        }

        Object.defineProperty(this, 'clear', {
            configurable: true,
            get: function () {
                return clear;
            }
        });

        function show(toBeShown) {
            const oldWidget = selected;
            selected = toBeShown;

            if (selected !== oldWidget) {
                selected.element.classList.add('p-card-shown');
                selected.element.style.display = '';

                if (oldWidget) {
                    oldWidget.element.classList.remove('p-card-shown');
                    oldWidget.element.style.display = 'none';
                }
                fireSelected(selected);
            }
        }

        function fireSelected(aItem) {
            const event = new SelectionEvent(self, aItem);
            selectHandlers.forEach(h => {
                Ui.later(() => {
                    h(event);
                });
            });
        }

        Object.defineProperty(this, 'show', {
            get: function () {
                return show;
            }
        });

        Object.defineProperty(this, 'selected', {
            get: function () {
                return selected;
            }
        });
        Object.defineProperty(this, 'selectedIndex', {
            get: function () {
                if (selected)
                    return self.indexOf(selected);
                else
                    return -1;
            }
        });

        const selectHandlers = new Set();

        function addSelectHandler(handler) {
            selectHandlers.add(handler);
            return {
                removeHandler: function () {
                    selectHandlers.delete(handler);
                }
            };
        }

        Object.defineProperty(this, 'addSelectHandler', {
            get: function () {
                return addSelectHandler;
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
    }
}

export default Cards;