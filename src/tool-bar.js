import Ui from 'kenga/utils';
import HBox from './horizontal-box-pane';

const SCROLL_PORTION = 20;
const AUTO_SCROLL_DELAY = 300;

class Toolbar extends HBox {
    constructor(hgap) {
        if (arguments.length < 1)
            hgap = 0;

        super(hgap);

        const self = this;

        this.element.classList.add('p-toolbar');
        this.element.classList.add('p-btn-group');

        const leftChevron = document.createElement('div');
        leftChevron.classList.add('p-toolbar-chevron');
        leftChevron.classList.add('p-toolbar-chevron-left');
        const rightChevron = document.createElement('div');
        rightChevron.classList.add('p-toolbar-chevron');
        rightChevron.classList.add('p-toolbar-chevron-right');

        this.addAddHandler(() => {
            checkChevrons();
        });
        this.addRemoveHandler(() => {
            checkChevrons();
        });

        function checkChevrons() {
            if (self.count > 0) {
                const lastTool = self.child(self.count - 1);
                if (self.element.scrollLeft > 0) {
                    if (parseFloat(leftChevron.style.left) !== self.element.scrollLeft)
                        leftChevron.style.left = `${self.element.scrollLeft}px`;
                    if (!leftChevron.parentElement) {
                        self.element.appendChild(leftChevron);
                    }
                } else {
                    scheduledLeft = null;
                    if (leftChevron.parentElement) {
                        leftChevron.parentElement.removeChild(leftChevron);
                    }
                }
                if (lastTool.element.offsetLeft + lastTool.element.offsetWidth - self.element.scrollLeft > self.element.offsetWidth) {
                    if (parseFloat(rightChevron.style.right) !== -self.element.scrollLeft)
                        rightChevron.style.right = `${-self.element.scrollLeft}px`;
                    if (!rightChevron.parentElement) {
                        self.element.appendChild(rightChevron);
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
            self.element.scrollLeft -= SCROLL_PORTION;
            checkChevrons();
        }

        function moveLeft() {
            self.element.scrollLeft += SCROLL_PORTION;
            checkChevrons();
        }

        Ui.on(this.element, Ui.Events.MOUSEOVER, () => {
            checkChevrons();
        });
        Ui.on(this.element, Ui.Events.SCROLL, event => {
            checkChevrons();
        });

        var scheduledLeft = null;
        Ui.on(leftChevron, Ui.Events.MOUSEDOWN, event => {
            function schedule() {
                Ui.delayed(AUTO_SCROLL_DELAY, () => {
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
                Ui.delayed(AUTO_SCROLL_DELAY, () => {
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

export default Toolbar;