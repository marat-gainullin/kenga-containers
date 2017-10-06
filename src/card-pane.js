import Id from 'core/id';
import Invoke from 'core/invoke';
import Container from 'ui/container';
import SelectionEvent from 'ui/events/item-event';

class Cards extends Container {
    constructor(hgap, vgap, shell, content) {
        if (!shell)
            shell = document.createElement('div');
        if (!content)
            content = shell;
        super(shell, content);

        const self = this;

        if (arguments.length < 2) {
            vgap = 0;
        }
        if (arguments.length < 1) {
            vgap = 0;
            hgap = 0;
        }

        this.element.classList.add('p-cards');

        this.element.id = `p-${Id.generate()}`;

        const style = document.createElement('style');
        self.element.appendChild(style);

        function formatChildren() {
            style.innerHTML =
                `div#${self.element.id} > .p-widget {}`;
        }
        formatChildren();

        const cards = new Map();

        let selectedComponent;

        Object.defineProperty(this, 'hgap', {
            get: function() {
                return hgap;
            },
            set: function(aValue) {
                if (hgap !== aValue) {
                    hgap = aValue;
                    self.element.style.paddingLeft = self.element.style.paddingRight = `${hgap}px`;
                }
            }
        });

        Object.defineProperty(this, 'vgap', {
            get: function() {
                return vgap;
            },
            set: function(aValue) {
                if (vgap !== aValue) {
                    vgap = aValue;
                    self.element.style.paddingTop = self.element.style.paddingBottom = `${vgap}px`;
                }
            }
        });

        const superChild = this.child;

        function child(indexOrCard) {
            if (isNaN(indexOrCard)) {
                const card = indexOrCard;
                return cards.get(card);
            } else {
                const index = +indexOrCard;
                return superChild(index);
            }
        }
        Object.defineProperty(this, 'child', {
            get: function() {
                return child;
            }
        });

        const superAdd = this.add;
        const superRemove = this.remove;

        function add(w, indexOrCard) {
            if (w) {
                if (w.parent === self)
                    throw 'A widget is already added to this container';
                let card;
                let index;
                if (arguments.length < 2 || indexOrCard === undefined) {
                    card = `card-${Id.generate()}`;
                    index = self.count;
                } else {
                    if (isNaN(indexOrCard)) {
                        card = indexOrCard;
                        index = self.count;
                    } else {
                        card = `card-${Id.generate()}`;
                        index = indexOrCard;
                    }
                }
                let old;
                if (cards.has(card)) {
                    old = superRemove(cards.get(card));
                }
                superAdd(w, index);
                cards.set(card, w);
                w['p-card'] = card;
                if (!selectedComponent) {
                    showWidget(w);
                }
                return {
                    card,
                    evicted: old
                };
            }
        }
        Object.defineProperty(this, 'add', {
            configurable: true,
            get: function() {
                return add;
            }
        });

        function remove(widgetOrIndexOrCard) {
            if (typeof widgetOrIndexOrCard === 'string')
                widgetOrIndexOrCard = cards.get(widgetOrIndexOrCard);
            const removed = superRemove(widgetOrIndexOrCard);
            if (removed) {
                removeCard(removed);
                if (selectedComponent === removed) {
                    if (self.count === 0) {
                        selectedComponent = null;
                    } else {
                        showWidget(superChild(0));
                    }
                }
            }
            return removed;
        }
        Object.defineProperty(this, 'remove', {
            configurable: true,
            get: function() {
                return remove;
            }
        });

        const superClear = this.clear;

        function clear() {
            selectedComponent = null;
            cards.clear();
            self.forEach(w => {
                w.element.classList.remove('p-card-shown');
            });
            superClear();
        }
        Object.defineProperty(this, 'clear', {
            configurable: true,
            get: function() {
                return clear;
            }
        });

        function removeCard(w) {
            w.element.classList.remove('p-card-shown');
            if (w && w['p-card']) {
                cards.delete(w['p-card']);
                delete w['p-card'];
            }
        }

        function showWidget(toBeShown) {
            const oldWidget = selectedComponent;
            selectedComponent = toBeShown;

            if (selectedComponent !== oldWidget) {
                selectedComponent.element.classList.add('p-card-shown');

                if (oldWidget) {
                    oldWidget.element.classList.remove('p-card-shown');
                }
                fireSelected(selectedComponent);
            }
        }

        function fireSelected(aItem) {
            const event = new SelectionEvent(self, aItem);
            selectionHandlers.forEach(h => {
                Invoke.later(() => {
                    h(event);
                });
            });
        }

        function show(widgetOrCardName) {
            if (cards.has(widgetOrCardName)) {
                const toShow = cards.get(widgetOrCardName);
                showWidget(toShow);
            } else {
                showWidget(widgetOrCardName);
            }
        }

        Object.defineProperty(this, 'show', {
            get: function() {
                return show;
            }
        });

        Object.defineProperty(this, 'selectedComponent', {
            get: function() {
                return selectedComponent;
            }
        });
        Object.defineProperty(this, 'selectedIndex', {
            get: function() {
                if (selectedComponent)
                    return self.indexOf(selectedComponent);
                else
                    return -1;
            }
        });

        const selectionHandlers = new Set();

        function addSelectionHandler(handler) {
            selectionHandlers.add(handler);
            return {
                removeHandler: function() {
                    selectionHandlers.delete(handler);
                }
            };
        }

        Object.defineProperty(this, 'addSelectionHandler', {
            get: function() {
                return addSelectionHandler;
            }
        });

        function ajustLeft(w, aValue) {}
        Object.defineProperty(this, 'ajustLeft', {
            get: function() {
                return ajustLeft;
            }
        });

        function ajustWidth(w, aValue) {}
        Object.defineProperty(this, 'ajustWidth', {
            get: function() {
                return ajustWidth;
            }
        });

        function ajustTop(w, aValue) {}
        Object.defineProperty(this, 'ajustTop', {
            get: function() {
                return ajustTop;
            }
        });

        function ajustHeight(w, aValue) {}
        Object.defineProperty(this, 'ajustHeight', {
            get: function() {
                return ajustHeight;
            }
        });
    }
}

export default Cards;