import Id from 'septima-utils/id';
import Container from 'kenga/container';

class Flow extends Container {
    constructor(hgap, vgap) {
        super();

        const self = this;

        if (arguments.length < 2) {
            vgap = 0;
        }
        if (arguments.length < 1) {
            vgap = 0;
            hgap = 0;
        }

        this.element.classList.add('p-flow');

        this.element.id = `p-${Id.next()}`;

        const style = document.createElement('style');

        function formatChildren() {
            style.innerHTML =
                (hgap != null && hgap != '' ? `div#${self.element.id} > .p-widget {margin-left: ${hgap}px;}` : '') +
                (vgap != null && vgap != '' ? `div#${self.element.id} > .p-widget {margin-top: ${vgap}px;}` : '');
        }

        formatChildren();
        this.element.appendChild(style);

        Object.defineProperty(this, 'hgap', {
            get: function () {
                return hgap;
            },
            set: function (aValue) {
                if (hgap !== aValue) {
                    hgap = aValue;
                    formatChildren();
                    self.element.style.paddingRight = hgap != null && hgap != '' ? `${hgap}px` : '';
                }
            }
        });
        Object.defineProperty(this, 'vgap', {
            get: function () {
                return vgap;
            },
            set: function (aValue) {
                if (vgap !== aValue) {
                    vgap = aValue;
                    formatChildren();
                    self.element.style.paddingBottom = vgap != null && vgap != '' ? `${vgap}px` : '';
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