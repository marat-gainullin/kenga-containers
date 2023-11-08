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
            hgap = '0px';
        }

        this.element.classList.add('p-flow');
        this.element.id = `p-${Ui.next()}`;

        Object.defineProperty(this, 'hgap', {
            get: function () {
                return hgap;
            },
            set: function (aValue) {
                if (hgap !== aValue) {
                    hgap = typeof aValue === 'number' ? `${aValue}px` : aValue;
                    this.element.style.columnGap = hgap
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
                    this.element.style.rowGap = vgap
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
