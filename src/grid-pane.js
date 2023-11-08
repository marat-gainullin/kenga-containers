import Ui from 'kenga/utils';
import Container from 'kenga/container';

/**
 * A container with Grid Layout.
 * @param rows the number of grid rows.
 * @param columns the number of grid columns.
 * @constructor GridPane GridPane
 */
class GridPane extends Container {
    constructor(hgap, vgap) {
        super();
        const self = this;

        let columns = 1;
        let rows = null;

        if (arguments.length < 2) {
            vgap = '0px';
        }
        if (arguments.length < 1) {
            hgap = '0px';
        }
        this.element.classList.add('p-cells');
        this.element.id = `p-${Ui.next()}`;

        function formatChilden() {
            self.element.style.gridTemplateColumns = typeof columns == 'number' ? Array.from({ length: columns }, () => '1fr').join(' ') : columns
            self.element.style.gridTemplateRows = typeof rows == 'number' ? Array.from({ length: rows }, () => '1fr').join(' ') : rows
        }
        formatChilden()

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

        Object.defineProperty(this, 'rows', {
            get: function () {
                return rows;
            },
            set: function (value) {
                if (rows != value) {
                    rows = value
                    formatChilden()
                }
            }
        });
        Object.defineProperty(this, 'columns', {
            get: function () {
                return columns;
            },
            set: function (value) {
                if (columns != value) {
                    columns = value
                    formatChilden()
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

export default GridPane;
