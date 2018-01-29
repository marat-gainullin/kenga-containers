import Id from 'septima-utils/id';
import Ui from 'kenga/utils';
import Container from 'kenga/container';

class Box extends Container {
    constructor(orientation, hgap, vgap) {
        super();

        const self = this;

        if (arguments.length < 3)
            vgap = 0;
        if (arguments.length < 2)
            hgap = 0;
        if (arguments.length < 1)
            orientation = Ui.Orientation.HORIZONTAL;

        this.element.classList.add('p-box-horizontal');
        this.element.classList.add('p-vertical-scroll-filler');
        this.element.id = `p-${Id.next()}`;

        const gapsStyle = document.createElement('style');
        this.element.appendChild(gapsStyle);

        function formatChildren() {
            if (orientation === Ui.Orientation.HORIZONTAL) {
                self.element.classList.remove('p-box-vertical');
                self.element.classList.remove('p-horizontal-scroll-filler');
                self.element.classList.add('p-box-horizontal');
                self.element.classList.add('p-vertical-scroll-filler');
                gapsStyle.innerHTML = ``
                        + `div#${self.element.id} > .p-widget{display:inline-block;vertical-align:middle;height:100%;}`
                        + `div#${self.element.id} > .p-holy-grail-column{display:inline-flex;vertical-align:middle;height: 100%;}`
                        + `div#${self.element.id} > .p-tabs{display:inline-flex;vertical-align:middle;height: 100%;}`
                        + `div#${self.element.id} > .p-widget:nth-child(n + ${3}) {margin-left: ${hgap}px;}`;
            } else {
                self.element.classList.remove('p-box-horizontal');
                self.element.classList.remove('p-vertical-scroll-filler');
                self.element.classList.add('p-box-vertical');
                self.element.classList.add('p-horizontal-scroll-filler');
                gapsStyle.innerHTML = ``
                        + `div#${self.element.id} > .p-widget {display: block; width:100%;}`
                        + `div#${self.element.id} > .p-holy-grail-column {display: flex; width:100%;}`
                        + `div#${self.element.id} > .p-tabs {display: flex; width:100%;}`
                        + `div#${self.element.id} > .p-widget:nth-child(n + ${3}) {margin-top: ${vgap}px;}`;
            }
        }
        formatChildren();

        Object.defineProperty(this, 'hgap', {
            get: function () {
                return hgap;
            },
            set: function (aValue) {
                if (hgap >= 0 && hgap !== aValue) {
                    hgap = aValue;
                    formatChildren();
                }
            }
        });
        Object.defineProperty(this, 'vgap', {
            configurable: true,
            get: function () {
                return vgap;
            },
            set: function (aValue) {
                if (vgap >= 0 && vgap !== aValue) {
                    vgap = aValue;
                    formatChildren();
                }
            }
        });
        Object.defineProperty(this, 'orientation', {
            configurable: true,
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

        function ajustLeft(w, aValue) {}
        Object.defineProperty(this, 'ajustLeft', {
            get: function () {
                return ajustLeft;
            }
        });

        function ajustWidth(w, aValue) {
            if (orientation === Ui.Orientation.HORIZONTAL) {
                w.element.style.width = `${aValue}px`;
            }
        }
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

        function ajustHeight(w, aValue) {
            if (orientation === Ui.Orientation.VERTICAL) {
                w.element.style.height = `${aValue}px`;
            }
        }
        Object.defineProperty(this, 'ajustHeight', {
            get: function () {
                return ajustHeight;
            }
        });
    }
}

export default Box;