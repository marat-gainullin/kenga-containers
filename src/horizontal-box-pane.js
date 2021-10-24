import Ui from 'kenga/utils';
import Container from 'kenga/container';

class HBox extends Container {
    constructor(hgap) {
        super();

        const self = this;

        if (arguments.length < 1)
            hgap = '0px';

        let align = 'fit';

        this.element.classList.add('p-box-horizontal');
        this.element.classList.add('p-vertical-scroll-filler');
        this.element.id = `p-${Ui.next()}`;

        const gapsStyle = document.createElement('style');
        this.element.appendChild(gapsStyle);

        function formatChildren() {
            const alignHeight = `vertical-align:${align === 'center' ? 'middle' : align === 'fit' ? 'top' : align};${align === 'fit' ? 'height:100%' : ''};`;
            gapsStyle.innerHTML = ``
                + `div#${self.element.id} > .p-widget{display:inline-block;${alignHeight}}`
                + `div#${self.element.id} > .p-grid-shell{display:inline-block;${alignHeight}}`
                + `div#${self.element.id} > .p-box-vertical{display:inline-flex;${alignHeight}}`
                + `div#${self.element.id} > .p-holy-grail-column{display:inline-flex;${alignHeight}}`
                + `div#${self.element.id} > .p-tabs{display:inline-flex;${alignHeight}}`
                + (hgap != null && hgap !== '' ? `div#${self.element.id} > .p-widget:nth-child(n + ${3}) {margin-left: ${hgap};}` : '');
        }

        formatChildren();

        Object.defineProperty(this, 'hgap', {
            get: function () {
                return hgap;
            },
            set: function (aValue) {
                if (hgap !== aValue) {
                    hgap = typeof aValue === 'number' ? `${aValue}px` : aValue;
                    formatChildren();
                }
            }
        });

        Object.defineProperty(this, 'align', {
            get: function () {
                return align;
            },
            set: function (aValue) {
                if (align !== aValue) {
                    align = aValue;
                    formatChildren();
                }
            }
        });

        function ajustLeft(w, aValue) {
        }

        Object.defineProperty(this, 'ajustLeft', {
            get: function () {
                return ajustLeft;
            }
        });

        function ajustTop(w, aValue) {
        }

        Object.defineProperty(this, 'ajustTop', {
            get: function () {
                return ajustTop;
            }
        });
    }
}

export default HBox;