import AnchorsPane from './anchors-pane';

class DesktopPane extends AnchorsPane {
    constructor() {
        super();

        const self = this;

        function lookupForms() {
            const res = [];
            let child = self.element.firstElementChild;
            while (child) {
                if (child.className.includes('p-window-shell')) {
                    res.push(child['p-widget']);
                }
                child = child.nextElementSibling;
            }
            return res;
        }

        Object.defineProperty(this, 'forms', {
            get: function() {
                return lookupForms();
            }
        });

        function minimizeAll() {
            lookupForms().forEach(w => {
                if (w.minimize) {
                    w.minimize();
                }
            });
        }
        Object.defineProperty(this, 'minimizeAll', {
            get: function() {
                return minimizeAll;
            }
        });

        function maximizeAll() {
            lookupForms().forEach(w => {
                if (w.maximize) {
                    w.maximize();
                }
            });
        }
        Object.defineProperty(this, 'maximizeAll', {
            get: function() {
                return maximizeAll;
            }
        });

        function restoreAll() {
            lookupForms().forEach(w => {
                if (w.restore) {
                    w.restore();
                }
            });
        }
        Object.defineProperty(this, 'restoreAll', {
            get: function() {
                return restoreAll;
            }
        });

        function closeAll() {
            lookupForms().forEach(w => {
                if (w.close) {
                    w.close();
                }
            });
        }
        Object.defineProperty(this, 'closeAll', {
            get: function() {
                return closeAll;
            }
        });

        let platformLocationLeft = 10;
        Object.defineProperty(this, 'platformLocationLeft', {
            get: function() {
                return platformLocationLeft;
            },
            set: function(aValue) {
                platformLocationLeft = aValue;
            }
        });

        let platformLocationTop = 10;
        Object.defineProperty(this, 'platformLocationTop', {
            get: function() {
                return platformLocationTop;
            },
            set: function(aValue) {
                platformLocationTop = aValue;
            }
        });

        const shownForms = new Map();

        function getShownForms() {
            return Array.from(shownForms.values());
        }

        function getShownForm(aFormKey) {
            return shownForms.get(aFormKey);
        }
        Object.defineProperty(this, 'shownForms', {
            get: function() {
                return shownForms;
            }
        });
        Object.defineProperty(this, 'shown', {
            get: function() {
                return getShownForms;
            }
        });

        Object.defineProperty(this, 'getShownForm', {
            get: function() {
                return getShownForm;
            }
        });
    }
}

export default DesktopPane;