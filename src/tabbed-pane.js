import Invoke from 'core/invoke';
import Ui from 'ui/utils';
import CardPane from './card-pane';

const SCROLL_PORTION = 20;
const AUTO_SCROLL_DELAY = 300;

class TabbedPane extends CardPane {
    constructor() {
        const shell = document.createElement('div');
        shell.className = 'p-tabs';
        const content = document.createElement('div');
        content.className = 'p-tabs-content';
        super(0, 0, shell, content);

        const self = this;

        const captionsShell = document.createElement('div');
        captionsShell.className = 'p-tabs-captions-shell';
        const captions = document.createElement('div');
        captions.className = 'p-tabs-captions';
        const tabsOf = new Map();

        captionsShell.appendChild(captions);
        shell.appendChild(captionsShell);
        shell.appendChild(content);

        function showCaption(toShow) {
            let caption = captions.firstElementChild;
            while (caption) {
                if (caption === toShow) {
                    caption.classList.add('p-tab-caption-selected');
                } else {
                    caption.classList.remove('p-tab-caption-selected');
                }
                caption = caption.nextElementSibling;
            }
        }

        function addCaption(w, title, image, toolTip, beforeIndex) {
            if (!title) {
                title = w.name ? w.name : `Unnamed - ${captions.childElementCount}`;
            }
            const caption = document.createElement('div');
            caption.className = 'p-tab-caption';
            Ui.on(caption, Ui.Events.CLICK, event => {
                event.stopPropagation();
                self.show(w);
            });
            const labelText = document.createElement('div');
            labelText.className = 'p-tab-caption-text';
            labelText.innerText = title;
            const closeTool = document.createElement('div');
            closeTool.className = 'p-tab-caption-close-tool';
            Ui.on(closeTool, Ui.Events.CLICK, event => {
                event.stopPropagation();
                self.remove(w);
            });
            if (toolTip)
                caption.title = toolTip;
            if (image) {
                image.classList.add('p-tab-caption-image');
                caption.appendChild(image);
            }
            caption.appendChild(labelText);
            caption.appendChild(closeTool);

            if (isNaN(beforeIndex)) {
                captions.appendChild(caption);
            } else {
                if (beforeIndex < captions.childElementCount) {
                    captions.insertBefore(caption, captions.children[beforeIndex]);
                } else {
                    captions.appendChild(caption);
                }
            }
            tabsOf.set(w, caption);
        }

        // TODO: Add <html> prefix in tab title feature 
        const superAdd = this.add;

        function add(w, title, image, tooltip, beforeIndex) {
            superAdd(w, beforeIndex);
            addCaption(w, arguments.length < 2 ? null : title, arguments.length < 3 ? null : image, arguments.length < 4 ? '' : tooltip, beforeIndex);
            checkChevrons();
        }
        Object.defineProperty(this, 'add', {
            get: function() {
                return add;
            }
        });

        const superRemove = this.remove;

        function remove(widgetOrIndex) {
            const removed = superRemove(widgetOrIndex);
            if (removed) {
                captions.removeChild(tabsOf.get(removed));
                tabsOf.delete(removed);
            }
            checkChevrons();
            return removed;
        }
        Object.defineProperty(this, 'remove', {
            get: function() {
                return remove;
            }
        });
        const superClear = this.clear;

        function clear() {
            superClear();
            while (captions.firstElementChild)
                captions.removeChild(captions.firstElementChild);
            tabsOf.clear();
            checkChevrons();
        }
        Object.defineProperty(this, 'clear', {
            get: function() {
                return clear;
            }
        });

        this.addSelectionHandler(evt => {
            showCaption(tabsOf.get(evt.item));
        });

        const leftChevron = document.createElement('div');
        leftChevron.classList.add('p-tabs-chevron');
        leftChevron.classList.add('p-tabs-chevron-left');
        const rightChevron = document.createElement('div');
        rightChevron.classList.add('p-tabs-chevron');
        rightChevron.classList.add('p-tabs-chevron-right');

        function checkChevrons() {
            if (self.count > 0) {
                const lastCaption = captions.lastElementChild;
                if (captions.scrollLeft > 0) {
                    if (!leftChevron.parentElement) {
                        captionsShell.appendChild(leftChevron);
                    }
                } else {
                    scheduledLeft = null;
                    if (leftChevron.parentElement) {
                        leftChevron.parentElement.removeChild(leftChevron);
                    }
                }
                if (lastCaption.offsetLeft + lastCaption.offsetWidth - captions.scrollLeft > captions.offsetWidth) {
                    if (!rightChevron.parentElement) {
                        captionsShell.appendChild(rightChevron);
                    }
                } else {
                    scheduledRight = null;
                    if (rightChevron.parentElement) {
                        rightChevron.parentElement.removeChild(rightChevron);
                    }
                }
            } else {
                scheduledLeft = null;
                scheduledRight = null;
                if (leftChevron.parentElement)
                    leftChevron.parentElement.removeChild(leftChevron);
                if (rightChevron.parentElement)
                    rightChevron.parentElement.removeChild(rightChevron);
            }
        }

        function moveRight() {
            captions.scrollLeft -= SCROLL_PORTION;
            checkChevrons();
        }

        function moveLeft() {
            captions.scrollLeft += SCROLL_PORTION;
            checkChevrons();
        }

        Ui.on(this.element, Ui.Events.MOUSEOVER, event => {
            checkChevrons();
        });
        Ui.on(captionsShell, Ui.Events.SCROLL, event => {
            checkChevrons();
        });

        var scheduledLeft = null;
        Ui.on(leftChevron, Ui.Events.MOUSEDOWN, event => {
            function schedule() {
                Invoke.delayed(AUTO_SCROLL_DELAY, () => {
                    if (scheduledLeft === schedule) {
                        schedule();
                        moveRight();
                    }
                });
            }
            scheduledLeft = schedule;
            schedule();
        });
        Ui.on(leftChevron, Ui.Events.MOUSEUP, event => {
            scheduledLeft = null;
            moveRight();
        });
        var scheduledRight = null;
        Ui.on(rightChevron, Ui.Events.MOUSEDOWN, event => {
            function schedule() {
                Invoke.delayed(AUTO_SCROLL_DELAY, () => {
                    if (scheduledRight === schedule) {
                        schedule();
                        moveLeft();
                    }
                });
            }
            scheduledRight = schedule;
            schedule();
        });
        Ui.on(rightChevron, Ui.Events.MOUSEUP, event => {
            scheduledRight = null;
            moveLeft();
        });
    }
}

export default TabbedPane;