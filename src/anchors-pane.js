import Container from 'kenga/container';

class Anchors extends Container {
    constructor() {
        super();
        const self = this;

        this.element.classList.add('p-anchors');

        function is(a) {
            return typeof a !== 'undefined' && a !== null && a !== '';
        }

        function getAnchors(w) {
            return {
                left: w.element.style.left,
                top: w.element.style.top,
                right: w.element.style.right,
                bottom: w.element.style.bottom,
                width: w.element.style.width,
                height: w.element.style.height
            };
        }
        function setAnchors(w, anchors) {
            w.element.style.left = anchors.left;
            w.element.style.top = anchors.top;
            w.element.style.right = anchors.right;
            w.element.style.bottom = anchors.bottom;
            w.element.style.width = anchors.width;
            w.element.style.height = anchors.height;
        }

        function updatePlainValue(anchor, value, containerSize) {
            if (anchor.endsWith('px'))
                return `${value}px`;
            else if (anchor.endsWith('%'))
                return `${value / containerSize * 100}%`;
            else
                return `${value}px`;
        }

        function ajustWidth(w, aValue) {
            if (typeof aValue === 'string') {
                w.element.style.width = !aValue.endsWith('px') && !aValue.endsWith('%') && !aValue.endsWith('em') && aValue !== 'null' ?
                        aValue + 'px' :
                        (aValue === 'null' ? null : aValue);
            } else if (aValue == null){
                w.element.style.width = '';
            } else {
                const anchors = getAnchors(w);
                const containerWidth = self.element.offsetWidth;
                if (is(anchors.width)) {
                    anchors.width = updatePlainValue(anchors.width, aValue, containerWidth);
                } else if (is(anchors.left) && is(anchors.right)) {
                    anchors.right = updatePlainValue(anchors.right, containerWidth - w.element.offsetLeft - aValue, containerWidth);
                } else {
                    anchors.width = `${aValue}px`;
                }
                setAnchors(w, anchors);
            }
        }
        Object.defineProperty(this, 'ajustWidth', {
            get: function () {
                return ajustWidth;
            }
        });

        function ajustHeight(w, aValue) {
            if (typeof aValue === 'string') {
                w.element.style.height = !aValue.endsWith('px') && !aValue.endsWith('%') && !aValue.endsWith('em') && aValue !== 'null' ?
                        aValue + 'px' :
                        (aValue === 'null' ? null : aValue);
            } else if (aValue == null){
                w.element.style.height = '';
            } else {
                const anchors = getAnchors(w);
                const containerHeight = self.element.offsetHeight;
                if (is(anchors.height)) {
                    anchors.height = updatePlainValue(anchors.height, aValue, containerHeight);
                } else if (is(anchors.top) && is(anchors.bottom)) {
                    anchors.bottom = updatePlainValue(anchors.bottom, containerHeight - w.element.offsetTop - aValue, containerHeight);
                } else {
                    anchors.height = `${aValue}px`;
                }
                setAnchors(w, anchors);
            }
        }
        Object.defineProperty(this, 'ajustHeight', {
            get: function () {
                return ajustHeight;
            }
        });

        function ajustLeft(w, aValue) {
            if (typeof aValue === 'string') {
                w.element.style.left = !aValue.endsWith('px') && !aValue.endsWith('%') && !aValue.endsWith('em') && aValue !== 'null' ?
                        aValue + 'px' :
                        (aValue === 'null' ? null : aValue);
            } else if (aValue == null){
                w.element.style.left = '';
            } else {
                const anchors = getAnchors(w);
                const containerWidth = self.element.offsetWidth;
                const childWidth = w.element.offsetWidth;
                if (is(anchors.left) && is(anchors.width)) {
                    anchors.left = updatePlainValue(anchors.left, aValue, containerWidth);
                } else if (is(anchors.width) && is(anchors.right)) {
                    anchors.right = updatePlainValue(anchors.right, containerWidth - aValue - childWidth, containerWidth);
                } else if (is(anchors.left) && is(anchors.right)) {
                    anchors.left = updatePlainValue(anchors.left, aValue, containerWidth);
                    anchors.right = updatePlainValue(anchors.right, containerWidth - aValue - childWidth, containerWidth);
                } else if (is(anchors.left)){
                    anchors.left = updatePlainValue(anchors.left, aValue, containerWidth);
                } else {
                    anchors.left = `${aValue}px`;
                }
                setAnchors(w, anchors);
            }
        }
        Object.defineProperty(this, 'ajustLeft', {
            get: function () {
                return ajustLeft;
            }
        });

        function ajustTop(w, aValue) {
            if (typeof aValue === 'string') {
                w.element.style.top = !aValue.endsWith('px') && !aValue.endsWith('%') && !aValue.endsWith('em') && aValue !== 'null' ?
                        aValue + 'px' :
                        (aValue === 'null' ? null : aValue);
            } else if (aValue == null){
                w.element.style.top = '';
            } else {
                const anchors = getAnchors(w);
                const containerHeight = self.element.offsetHeight;
                const childHeight = w.element.offsetHeight;
                if (is(anchors.top) && is(anchors.height)) {
                    anchors.top = updatePlainValue(anchors.top, aValue, containerHeight);
                } else if (is(anchors.height) && is(anchors.bottom)) {
                    anchors.bottom = updatePlainValue(anchors.bottom, containerHeight - aValue - childHeight, containerHeight);
                } else if (is(anchors.top) && is(anchors.bottom)) {
                    anchors.top = updatePlainValue(anchors.top, aValue, containerHeight);
                    anchors.bottom = updatePlainValue(anchors.bottom, containerHeight - aValue - childHeight, containerHeight);
                } else if (is(anchors.top)){
                    anchors.top = updatePlainValue(anchors.top, aValue, containerHeight);
                } else {
                    anchors.top = `${aValue}px`;
                }
                setAnchors(w, anchors);
            }
        }
        Object.defineProperty(this, 'ajustTop', {
            get: function () {
                return ajustTop;
            }
        });
    }
}

export default Anchors;
