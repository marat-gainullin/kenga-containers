import Id from 'septima-utils/id';
import Ui from 'kenga/utils';
import Container from 'kenga/container';

class HolyGrailPane extends Container {
    constructor(hgap, vgap) {
        if (arguments.length < 2)
            vgap = 0;
        if (arguments.length < 1)
            hgap = 0;

        super();

        const self = this;
        const flexColumn = this.element;

        flexColumn.classList.add('p-holy-grail-column');
        const flexRow = document.createElement('div');
        flexRow.classList.add('p-holy-grail-row');
        this.element.appendChild(flexRow);

        flexColumn.id = `p-${Id.next()}`;
        flexRow.id = `p-${Id.next()}`;

        const gapsStyle = document.createElement('style');
        this.element.appendChild(gapsStyle);

        function formatChildren() {
            gapsStyle.innerHTML =
                    `div#${flexColumn.id} > .p-holy-grail-row {margin-top: ${vgap}px;margin-bottom: ${vgap}px;}div#${flexRow.id} > .p-holy-grail-content {margin-left: ${hgap}px;margin-right: ${hgap}px;}`;
        }
        formatChildren();

        let content;
        let leftSide;
        let rightSide;
        let header;
        let footer;

        Object.defineProperty(this, 'hgap', {
            get: function () {
                return hgap;
            },
            set: function (aValue) {
                if (hgap !== aValue) {
                    hgap = aValue;
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
                    vgap = aValue;
                    formatChildren();
                }
            }
        });

        const superAdd = this.add;

        function add(w, aPlace, aSize) {
            if (arguments.length < 2) {
                if (!self.header) {
                    self.header = w;
                    return null;
                } else if (!self.leftSide) {
                    self.leftSide = w;
                    return null;
                } else if (!self.content) {
                    self.content = w;
                    return null;
                } else if (!self.rightSide) {
                    self.rightSide = w;
                    return null;
                } else if (!self.footer) {
                    self.footer = w;
                    return null;
                } else {
                    let oldContent = self.content;
                    self.content = w;
                    return oldContent;
                }
            } else {
                switch (aPlace) {
                    case Ui.HorizontalPosition.LEFT:
                        const lold = self.leftSide;
                        self.leftSide = w;
                        if (arguments.length > 2)
                            w.width = aSize;
                        return lold;
                    case Ui.HorizontalPosition.RIGHT:
                        const rold = self.rightSide;
                        self.rightSide = w;
                        if (arguments.length > 2)
                            w.width = aSize;
                        return rold;
                    case Ui.VerticalPosition.TOP:
                        const told = self.header;
                        self.header = w;
                        if (arguments.length > 2)
                            w.height = aSize;
                        return told;
                    case Ui.VerticalPosition.BOTTOM:
                        const bold = self.footer;
                        self.footer = w;
                        if (arguments.length > 2)
                            w.height = aSize;
                        return bold;
                    default:
                        let cold = self.content;
                        self.content = w;
                        return cold;
                }
            }
        }
        Object.defineProperty(this, 'add', {
            get: function () {
                return add;
            }
        });

        function leftSideRemoved() {
            leftSide.element.classList.remove('p-holy-grail-left');
            leftSide = null;
        }

        function rightSideRemoved() {
            rightSide.element.classList.remove('p-holy-grail-right');
            rightSide = null;
        }

        function headerRemoved() {
            header.element.classList.remove('p-holy-grail-header');
            header = null;
        }

        function footerRemoved() {
            footer.element.classList.remove('p-holy-grail-footer');
            footer = null;
        }

        function contentRemoved() {
            content.element.classList.remove('p-holy-grail-content');
            content = null;
        }

        function checkRemoved(w) {
            if (leftSide === w) {
                leftSideRemoved();
            }
            if (rightSide === w) {
                rightSideRemoved();
            }
            if (header === w) {
                headerRemoved();
            }
            if (footer === w) {
                footerRemoved();
            }
            if (content === w) {
                contentRemoved();
            }
        }

        const superRemove = this.remove;

        function remove(widgetOrIndex) {
            const removed = superRemove(widgetOrIndex);
            checkRemoved(removed);
            return removed;
        }
        Object.defineProperty(this, 'remove', {
            get: function () {
                return remove;
            }
        });

        const superClear = this.clear;

        function clear() {
            superClear();
            if (leftSide)
                leftSideRemoved();
            if (rightSide)
                rightSideRemoved();
            if (header)
                headerRemoved();
            if (footer)
                footerRemoved();
            if (content)
                contentRemoved();
        }
        Object.defineProperty(this, 'clear', {
            get: function () {
                return clear;
            }
        });

        Object.defineProperty(this, 'leftSide', {
            get: function () {
                return leftSide;
            },
            set: function (w) {
                if (w !== leftSide) {
                    if (leftSide) {
                        superRemove(leftSide);
                        leftSideRemoved();
                    }
                    if (w) {
                        superAdd(w);
                        flexRow.appendChild(w.element);
                        w.element.classList.add('p-holy-grail-left');
                    }
                    leftSide = w;
                }
            }
        });
        Object.defineProperty(this, 'rightSide', {
            get: function () {
                return rightSide;
            },
            set: function (w) {
                if (w !== rightSide) {
                    if (rightSide) {
                        superRemove(rightSide);
                        rightSideRemoved();
                    }
                    if (w) {
                        superAdd(w);
                        flexRow.appendChild(w.element);
                        w.element.classList.add('p-holy-grail-right');
                    }
                    rightSide = w;
                }
            }
        });
        Object.defineProperty(this, 'header', {
            get: function () {
                return header;
            },
            set: function (w) {
                if (w !== header) {
                    if (header) {
                        superRemove(header);
                        headerRemoved();
                    }
                    if (w) {
                        superAdd(w);
                        w.element.classList.add('p-holy-grail-header');
                    }
                    header = w;
                }
            }
        });
        Object.defineProperty(this, 'footer', {
            get: function () {
                return footer;
            },
            set: function (w) {
                if (w !== footer) {
                    if (footer) {
                        superRemove(footer);
                        footerRemoved();
                    }
                    if (w) {
                        superAdd(w);
                        w.element.classList.add('p-holy-grail-footer');
                    }
                    footer = w;
                }
            }
        });
        Object.defineProperty(this, 'content', {
            get: function () {
                return content;
            },
            set: function (w) {
                if (w !== content) {
                    if (content) {
                        superRemove(content);
                        contentRemoved();
                    }
                    if (w) {
                        superAdd(w);
                        w.element.classList.add('p-holy-grail-content');
                        flexRow.appendChild(w.element);
                    }
                    content = w;
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
            if (leftSide === w) {
                leftSide.element.style.width = `${aValue}px`;
            } else if (rightSide === w) {
                rightSide.element.style.width = `${aValue}px`;
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
            if (header === w) {
                header.element.style.height = `${aValue}px`;
            } else if (footer === w) {
                footer.element.style.height = `${aValue}px`;
            }
        }
        Object.defineProperty(this, 'ajustHeight', {
            get: function () {
                return ajustHeight;
            }
        });
    }
}

export default HolyGrailPane;