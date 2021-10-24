import Ui from 'kenga/utils';
import Container from 'kenga/container';

class Flow extends Container {
    constructor(hgap, vgap) {
        super();

        const self = this;

        if (arguments.length < 2) {
            vgap = '0px';
        }
        if (arguments.length < 1) {
            vgap = '0px';
            hgap = '0px';
        }

        this.element.classList.add('p-flow');

        this.element.id = `p-${Ui.next()}`;

        const style = document.createElement('style');

        function formatChildren() {
            style.innerHTML =
                (hgap != null && hgap != '' ? `div#${self.element.id} > .p-widget {margin-left: ${hgap};}` : '') +
                (vgap != null && vgap != '' ? `div#${self.element.id} > .p-widget {margin-top: ${vgap};}` : '');
            self.element.style.paddingRight = hgap != null && hgap != '' ? `${hgap}` : '';
            self.element.style.paddingBottom = vgap != null && vgap != '' ? `${vgap}` : '';
        }

        formatChildren();
        this.element.appendChild(style);

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
        Object.defineProperty(this, 'vgap', {
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

        const superAdd = this.add;

        function add(w, beforeIndex) {
            if (w) {
                if (w.parent === self)
                    throw 'A widget already added to this container';
                superAdd(w, beforeIndex);
            }
        }

        Object.defineProperty(this, 'add', {
            get: function () {
                return add;
            }
        });
    }
}

export default Flow;