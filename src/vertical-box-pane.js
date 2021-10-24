import Ui from 'kenga/utils';
import Container from 'kenga/container';

class VBox extends Container {
    constructor(vgap) {
        super();

        const self = this;

        if (arguments.length < 1)
            vgap = '0px';

        let align = 'fit';

        self.element.classList.add('p-box-vertical');
        self.element.classList.add('p-horizontal-scroll-filler');
        this.element.id = `p-${Ui.next()}`;

        const gapsStyle = document.createElement('style');
        this.element.appendChild(gapsStyle);

        function formatChildren() {
            self.element.style.alignItems = align === 'fit' ? 'stretch' : align === 'left' ? 'start' : align === 'right' ? 'end' : align;
            gapsStyle.innerHTML = ``
                + (vgap != null && vgap !== '' ? `div#${self.element.id} > .p-widget {margin-top: ${vgap};}` : '');
            self.element.style.paddingBottom = vgap != null && vgap !== '' ? `${vgap}px` : '';
        }

        formatChildren();

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

        Object.defineProperty(this, 'vgap', {
            configurable: true,
            get: function () {
                return vgap;
            },
            set: function (aValue) {
                if (vgap !== aValue) {
                    vgap = typeof aValue === 'number' ? `${aValue}px` : aValue;
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

export default VBox;