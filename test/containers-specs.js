/* global expect, spyOn */
// These imports are located here because we have tests only dependencies
import './layout.css';
import './theme.css';
// These imports have transitive references only to kenga css
import '../src/layout.css';
import '../src/theme.css';

import Invoke from 'septima-utils/invoke';
import Logger from 'septima-utils/logger';
import Resource from 'septima-remote/resource';
import Ui from 'kenga/utils';
import Font from 'kenga/font';
import Color from 'kenga/color';
import Cursor from 'kenga/cursor';
import CheckBox from 'kenga-buttons/check-box';
import RadioButton from 'kenga-buttons/radio-button';
import ToggleButton from 'kenga-buttons/toggle-button';
import TextArea from 'kenga-fields/text-area';
import RichTextArea from 'kenga-fields/rich-text-area';
import Box from '../src/box-pane';
import Flow from '../src/flow-pane';
import Cards from '../src/card-pane';
import Cells from '../src/grid-pane';
import Toolbar from '../src/tool-bar';
import Split from '../src/split-pane';
import Scroll from '../src/scroll-pane';
import Grail from '../src/holy-grail-pane';
import Anchors from '../src/anchors-pane';
import TabbedPane from '../src/tabbed-pane';
import ButtonGroup from '../src/button-group';

describe('Containers Api', () => {

    function expectValue(obj, prop, value) {
        obj[prop] = value;
        expect(obj[prop]).toEqual(value);
    }

    function expectWidget(widget) {
        expect('name' in widget).toBeTruthy();
        expectValue(widget, 'name', 'widgetName');
        expect('element' in widget).toBeTruthy();
        expect('parent' in widget).toBeTruthy();
        expectValue(widget, 'parent', new widget.constructor());
        expectValue(widget, 'parent', null);
        expect('left' in widget).toBeTruthy();
        expectValue(widget, 'left', 30);
        expect('width' in widget).toBeTruthy();
        expectValue(widget, 'width', 50);
        expect('top' in widget).toBeTruthy();
        expectValue(widget, 'top', 57);
        expect('height' in widget).toBeTruthy();
        expectValue(widget, 'height', 80);
        expect('enabled' in widget).toBeTruthy();
        expectValue(widget, 'enabled', true);
        expectValue(widget, 'enabled', false);
        expect('visible' in widget).toBeTruthy();
        expectValue(widget, 'visible', true);
        expectValue(widget, 'visible', false);
        expect('opaque' in widget).toBeTruthy();
        expectValue(widget, 'opaque', true);
        expectValue(widget, 'opaque', false);
        expect('cursor' in widget).toBeTruthy();
        expectValue(widget, 'cursor', Cursor.WAIT);
        expect('background' in widget).toBeTruthy();
        expectValue(widget, 'background', new Color('#fcfcfc'));
        expect('foreground' in widget).toBeTruthy();
        expectValue(widget, 'foreground', new Color(12, 45, 78, 35));
        expect('error' in widget).toBeTruthy();
        expectValue(widget, 'error', 'sample validation message');
        expect('contextMenu' in widget).toBeTruthy();
        expectValue(widget, 'contextMenu', new widget.constructor());
        expect('toolTipText' in widget).toBeTruthy();
        expectValue(widget, 'toolTipText', ' sample tooltip');
        expect('focusable' in widget).toBeTruthy();
        expectValue(widget, 'focusable', true);
        expectValue(widget, 'focusable', false);
        expect('font' in widget).toBeDefined();
        expectValue(widget, 'font', new Font('Arial', Font.Style.ITALIC, 14));
        expect(widget.focus).toBeDefined();
        expect(typeof widget.focus).toEqual('function');
        widget.focus();

        expect('onShow' in widget).toBeTruthy();
        expectValue(widget, 'onShow', () => {
        });
        expect('onHide' in widget).toBeTruthy();
        expectValue(widget, 'onHide', () => {
        });
        expect('onMouseRelease' in widget).toBeTruthy();
        expectValue(widget, 'onMouseRelease', () => {
        });
        expect('onFocusLost' in widget).toBeTruthy();
        expectValue(widget, 'onFocusLost', () => {
        });
        expect('onMousePress' in widget).toBeTruthy();
        expectValue(widget, 'onMousePress', () => {
        });
        expect('onMouseEnter' in widget).toBeTruthy();
        expectValue(widget, 'onMouseEnter', () => {
        });
        expect('onMouseMove' in widget).toBeTruthy();
        expectValue(widget, 'onMouseMove', () => {
        });
        expect('onAction' in widget).toBeTruthy();
        expectValue(widget, 'onAction', () => {
        });
        expect('onKeyRelease' in widget).toBeTruthy();
        expectValue(widget, 'onKeyRelease', () => {
        });
        expect('onKeyType' in widget).toBeTruthy();
        expectValue(widget, 'onKeyType', () => {
        });
        expect('onMouseWheelMove' in widget).toBeTruthy();
        expectValue(widget, 'onMouseWheelMove', () => {
        });
        expect('onFocus' in widget).toBeTruthy();
        expectValue(widget, 'onFocus', () => {
        });
        expect('onMouseClick' in widget).toBeTruthy();
        expectValue(widget, 'onMouseClick', () => {
        });
        expect('onMouseExit' in widget).toBeTruthy();
        expectValue(widget, 'onMouseExit', () => {
        });
        expect('onKeyPress' in widget).toBeTruthy();
        expectValue(widget, 'onKeyPress', () => {
        });
    }

    function expectContainer(container) {
        expectWidget(container);
        // Structure
        expect('count' in container).toBeTruthy();
        expect(container.add).toBeDefined();
        expect(typeof container.add).toEqual('function');
        expect(container.remove).toBeDefined();
        expect(typeof container.remove).toEqual('function');
        expect(container.clear).toBeDefined();
        expect(typeof container.clear).toEqual('function');
        expect(container.children).toBeDefined();
        expect(typeof container.children).toEqual('function');
        expect(container.child).toBeDefined();
        expect(typeof container.child).toEqual('function');
        expect('onAdd' in container).toBeTruthy();
        expectValue(container, 'onAdd', () => {
        });
        expect('onRemove' in container).toBeTruthy();
        expectValue(container, 'onRemove', () => {
        });
    }

    it('Flow pane.Structure', done => {
        const container = new Flow();
        expectContainer(container);
        expect(container.hgap).toEqual(0);
        expect(container.vgap).toEqual(0);
        expect(container.element).toBeDefined();
        const container2 = new Flow(3, 6);
        expectContainer(container2);
        expect(container2.hgap).toEqual(3);
        expect(container2.vgap).toEqual(6);
        expect(container2.element).toBeDefined();

        const child0 = new Flow();
        const child1 = new Flow();
        const child2 = new Flow();
        container.add(child0);
        container.add(child1);
        container.add(child2);

        expect(container.count).toEqual(3);
        expect(container.child(0)).toEqual(child0);
        expect(container.child(1)).toEqual(child1);
        expect(container.child(2)).toEqual(child2);
        expect(container.children()).toEqual([child0, child1, child2]);
        expect(container.indexOf(child0)).toEqual(0);
        expect(container.indexOf(child1)).toEqual(1);
        expect(container.indexOf(child2)).toEqual(2);

        const removed0 = container.remove(0);
        expect(removed0).toBeDefined();
        const removed1 = container.remove(child1);
        expect(removed1).toBeDefined();

        container.clear();
        expect(container.count).toEqual(0);
        expect(container.child(0)).toEqual(null);
        expect(container.children()).toEqual([]);
        expect(container.indexOf(child0)).toEqual(-1);
        expect(container.indexOf(child1)).toEqual(-1);
        expect(container.indexOf(child2)).toEqual(-1);

        done();
    });
    it('Flow pane.detached children left top width height', done => {
        const container = new Flow();
        const widget = new Flow();
        container.add(widget);

        expect(widget.left).toEqual(0);
        widget.left += 10;
        expect(widget.left).toEqual(10);

        expect(widget.top).toEqual(0);
        widget.top += 20;
        expect(widget.top).toEqual(20);

        expect(widget.width).toEqual(0);
        widget.width += 30;
        expect(widget.width).toEqual(30);

        expect(widget.height).toEqual(0);
        widget.height += 40;
        expect(widget.height).toEqual(40);

        done();
    });
    it('Flow pane.attached children left top width height', done => {
        const container = new Flow();
        container.width = container.height = 40;
        document.body.appendChild(container.element);
        expect(container.attached).toBeTruthy();
        Invoke.later(() => {
            const widget = new Flow();
            container.add(widget);
            expect(widget.attached).toBeTruthy();

            expect(widget.width).toEqual(0);
            widget.width += 30;
            expect(widget.width).toEqual(30);

            expect(widget.height).toEqual(0);
            widget.height += 40;
            expect(widget.height).toEqual(40);

            expect(widget.left).toEqual(0);
            widget.left += 10;
            expect(widget.left).toEqual(10);

            expect(widget.top).toEqual(0);
            widget.top += 20;
            expect(widget.top).toEqual(20);

            document.body.removeChild(container.element);

            done();
        });
    });
    it('Flow pane.attached hgap vgap', done => {
        const container = new Flow();
        document.body.appendChild(container.element);
        expect(container.attached).toBeTruthy();
        Invoke.later(() => {
            container.width = container.height = 40;
            const widget1 = new Flow();
            container.add(widget1);
            expect(widget1.attached).toBeTruthy();
            widget1.width = 10;
            widget1.height = 10;

            const widget2 = new Flow();
            widget2.width = 10;
            widget2.height = 10;
            container.add(widget2);
            expect(widget2.attached).toBeTruthy();

            expect(widget2.left).toEqual(widget1.left + widget1.width);
            container.hgap += 5;
            expect(container.hgap).toEqual(5);
            Invoke.later(() => {
                expect(widget2.left).toEqual(10 + 2 * container.hgap);

                expect(widget1.top).toEqual(0);
                expect(widget2.top).toEqual(0);
                container.width = 20;
                expect(widget1.top).toEqual(0);
                expect(widget2.top).toEqual(10);
                container.vgap += 5;
                expect(widget1.top).toEqual(5);
                expect(widget2.top).toEqual(20);

                document.body.removeChild(container.element);
                done();
            });
        });
    });
    it('Cards pane.Structure', done => {
        const container = new Cards();
        let selectedEvents = 0;
        const selected = container.addSelectHandler(event => {
            selectedEvents++;
            expect(event).toBeDefined();
            expect(event.source).toBeDefined();
            expect(event.target).toBeDefined();
            expect(event.item).toBeDefined();
        });
        expectContainer(container);
        expect(container.hgap).toEqual(0);
        expect(container.vgap).toEqual(0);
        expect(container.element).toBeDefined();
        const container2 = new Cards(3, 6);
        expectContainer(container2);
        expect(container2.hgap).toEqual(3);
        expect(container2.vgap).toEqual(6);
        expect(container2.element).toBeDefined();

        // General structure
        const child0 = new Cards();
        const child1 = new Cards();
        const child2 = new Cards();
        container.add(child0);
        container.add(child1);
        container.add(child2);

        expect(container.count).toEqual(3);
        expect(container.child(0)).toEqual(child0);
        expect(container.child(1)).toEqual(child1);
        expect(container.child(2)).toEqual(child2);
        expect(container.children()).toEqual([child0, child1, child2]);
        expect(container.indexOf(child0)).toEqual(0);
        expect(container.indexOf(child1)).toEqual(1);
        expect(container.indexOf(child2)).toEqual(2);

        const removed0 = container.remove(0);
        expect(removed0).toBeDefined();
        const removed1 = container.remove(child1);
        expect(removed1).toBeDefined();

        container.clear();
        expect(container.count).toEqual(0);
        expect(container.child(0)).toEqual(null);
        expect(container.children()).toEqual([]);
        expect(container.indexOf(child0)).toEqual(-1);
        expect(container.indexOf(child1)).toEqual(-1);
        expect(container.indexOf(child2)).toEqual(-1);

        selected.removeHandler();
        Invoke.later(() => {
            expect(selectedEvents).toBeGreaterThan(0);
            done();
        });
    });
    it('Cards pane.detached children left top width height', done => {
        const container = new Cards();
        const widget = new Cards();
        container.add(widget);

        expect(widget.left).toEqual(0);
        widget.left += 10;
        expect(widget.left).toEqual(0);

        expect(widget.top).toEqual(0);
        widget.top += 20;
        expect(widget.top).toEqual(0);

        expect(widget.width).toEqual(0);
        widget.width += 30;
        expect(widget.width).toEqual(0);

        expect(widget.height).toEqual(0);
        widget.height += 40;
        expect(widget.height).toEqual(0);

        done();
    });
    it('Cards pane.attached children left top width height', done => {
        const container = new Cards();
        container.width = container.height = 40;
        document.body.appendChild(container.element);
        expect(container.attached).toBeTruthy();
        Invoke.later(() => {
            const widget = new Cards();
            container.add(widget);
            expect(widget.attached).toBeTruthy();

            expect(widget.width).toEqual(40);
            widget.width += 20;
            expect(widget.width).toEqual(40);

            expect(widget.height).toEqual(40);
            widget.height += 20;
            expect(widget.height).toEqual(40);

            expect(widget.left).toEqual(0);
            widget.left += 10;
            expect(widget.left).toEqual(0);

            expect(widget.top).toEqual(0);
            widget.top += 10;
            expect(widget.top).toEqual(0);

            document.body.removeChild(container.element);

            done();
        });
    });
    it('Cards pane.attached hgap vgap', done => {
        const container = new Cards();
        container.background = Color.BLUE;
        document.body.appendChild(container.element);
        container.width = container.height = 400;
        expect(container.attached).toBeTruthy();
        Invoke.later(() => {
            const widget1 = new Cards();
            widget1.background = Color.black;
            container.add(widget1);
            expect(widget1.attached).toBeTruthy();

            Invoke.later(() => {
                expect(widget1.left).toEqual(0);
                expect(widget1.top).toEqual(0);
                expect(widget1.width).toEqual(400);
                expect(widget1.height).toEqual(400);
                container.hgap += 20;
                expect(widget1.left).toEqual(20);
                expect(widget1.width).toEqual(360);
                container.vgap += 20;
                expect(widget1.top).toEqual(20);
                expect(widget1.height).toEqual(360);

                document.body.removeChild(container.element);
                done();
            });
        });
    });

    it('Grid pane.Structure', done => {
        const container1 = new Cells();
        expectContainer(container1);
        expect(container1.rows).toEqual(1);
        expect(container1.columns).toEqual(1);
        expect(container1.hgap).toEqual(0);
        expect(container1.vgap).toEqual(0);
        const container = new Cells(2, 2);
        expect(container.rows).toEqual(2);
        expect(container.columns).toEqual(2);
        expect(container.hgap).toEqual(0);
        expect(container.vgap).toEqual(0);
        const container2 = new Cells(2, 2, 5);
        expect(container2.rows).toEqual(2);
        expect(container2.columns).toEqual(2);
        expect(container2.hgap).toEqual(5);
        expect(container2.vgap).toEqual(0);
        const container3 = new Cells(2, 2, 5, 4);
        expect(container3.rows).toEqual(2);
        expect(container3.columns).toEqual(2);
        expect(container3.hgap).toEqual(5);
        expect(container3.vgap).toEqual(4);
        // General structure
        const child00 = new Cells();
        const child11 = new Cells();
        const child01 = new Cells();
        const child_10 = new Cells();
        const child10 = new Cells();
        container.add(child00, 0, 0);
        container.add(child11, 1, 1);
        container.add(child01, 0, 1);
        container.add(child_10, 1, 0);
        expect(container.indexOf(child_10)).toEqual(3);
        const evicted = container.add(child10, 1, 0);
        expect(evicted).toBeDefined();
        expect(evicted).toEqual(child_10);
        expect(container.indexOf(child_10)).toEqual(-1);

        expect(container.count).toEqual(4);
        expect(container.child(0, 0)).toEqual(child00);
        expect(container.child(1, 1)).toEqual(child11);
        expect(container.child(0, 1)).toEqual(child01);
        expect(container.child(1, 0)).toEqual(child10);
        expect(container.children()).toEqual([child00, child11, child01, child10]);
        expect(container.indexOf(child00)).toEqual(0);
        expect(container.indexOf(child11)).toEqual(1);
        expect(container.indexOf(child01)).toEqual(2);
        expect(container.indexOf(child10)).toEqual(3);

        const removed00 = container.remove(0);
        expect(removed00).toBeDefined();
        expect(removed00).toEqual(child00);
        const removed11 = container.remove(child11);
        expect(removed11).toBeDefined();
        expect(removed11).toEqual(child11);
        const removed01 = container.remove(0, 1);
        expect(removed01).toBeDefined();
        expect(removed01).toEqual(child01);

        container.clear();
        expect(container.count).toEqual(0);
        expect(container.child(0)).toEqual(null);
        expect(container.children()).toEqual([]);
        expect(container.indexOf(child00)).toEqual(-1);
        expect(container.indexOf(child11)).toEqual(-1);
        expect(container.indexOf(child01)).toEqual(-1);
        expect(container.indexOf(child10)).toEqual(-1);

        container.add(child00);
        container.add(child01);
        container.add(child10);
        container.add(child11);
        expect(container.child(0, 0)).toEqual(child00);
        expect(container.child(0, 1)).toEqual(child01);
        expect(container.child(1, 0)).toEqual(child10);
        expect(container.child(1, 1)).toEqual(child11);

        done();
    });

    it('Grid pane.detached children left top width height', done => {
        const container = new Cells();
        const widget = new Cells();
        container.add(widget, 0, 0);

        expect(widget.left).toEqual(0);
        widget.left += 10;
        expect(widget.left).toEqual(0);

        expect(widget.top).toEqual(0);
        widget.top += 20;
        expect(widget.top).toEqual(0);

        expect(widget.width).toEqual(0);
        widget.width += 30;
        expect(widget.width).toEqual(0);

        expect(widget.height).toEqual(0);
        widget.height += 40;
        expect(widget.height).toEqual(0);

        done();
    });
    it('Grid pane.attached children left top width height', done => {
        const container = new Cells(2, 2);
        container.width = container.height = 400;
        document.body.appendChild(container.element);
        const widget00 = new Cells();
        const widget01 = new Cells();
        const widget10 = new Cells();
        const widget11 = new Cells();
        container.add(widget00, 0, 0);
        container.add(widget01, 0, 1);
        container.add(widget10, 1, 0);
        container.add(widget11, 1, 1);

        Invoke.later(() => {
            // 00
            expect(widget00.left).toEqual(0);
            widget00.left += 10;
            expect(widget00.left).toEqual(0);

            expect(widget00.top).toEqual(0);
            widget00.top += 20;
            expect(widget00.top).toEqual(0);

            expect(widget00.width).toEqual(200);
            widget00.width += 30;
            expect(widget00.width).toEqual(200);

            expect(widget00.height).toEqual(200);
            widget00.height += 40;
            expect(widget00.height).toEqual(200);
            // 01
            expect(widget01.left).toEqual(200);
            widget01.left += 10;
            expect(widget01.left).toEqual(200);

            expect(widget01.top).toEqual(0);
            widget01.top += 20;
            expect(widget01.top).toEqual(0);

            expect(widget01.width).toEqual(200);
            widget01.width += 30;
            expect(widget01.width).toEqual(200);

            expect(widget01.height).toEqual(200);
            widget01.height += 40;
            expect(widget01.height).toEqual(200);

            // 10
            expect(widget10.left).toEqual(0);
            widget10.left += 10;
            expect(widget10.left).toEqual(0);

            expect(widget10.top).toEqual(200);
            widget10.top += 20;
            expect(widget10.top).toEqual(200);

            expect(widget10.width).toEqual(200);
            widget10.width += 30;
            expect(widget10.width).toEqual(200);

            expect(widget10.height).toEqual(200);
            widget10.height += 40;
            expect(widget10.height).toEqual(200);

            // 11
            expect(widget11.left).toEqual(200);
            widget11.left += 10;
            expect(widget11.left).toEqual(200);

            expect(widget11.top).toEqual(200);
            widget11.top += 20;
            expect(widget11.top).toEqual(200);

            expect(widget11.width).toEqual(200);
            widget11.width += 30;
            expect(widget11.width).toEqual(200);

            expect(widget11.height).toEqual(200);
            widget11.height += 40;
            expect(widget11.height).toEqual(200);

            document.body.removeChild(container.element);
            done();
        });
    });
    it('Grid pane.attached hgap vgap', done => {
        const container = new Cells(2, 2);
        container.width = container.height = 400;
        container.background = Color.blue;
        document.body.appendChild(container.element);
        const widget00 = new Cells();
        widget00.background = Color.black;
        const widget01 = new Cells();
        widget01.background = Color.black;
        const widget10 = new Cells();
        widget10.background = Color.black;
        const widget11 = new Cells();
        widget11.background = Color.black;
        container.add(widget00, 0, 0);
        container.add(widget01, 0, 1);
        container.add(widget10, 1, 0);
        container.add(widget11, 1, 1);

        container.hgap = 20;
        Invoke.later(() => {
            // 00
            expect(widget00.left).toEqual(0);
            expect(widget00.top).toEqual(0);
            expect(widget00.width).toEqual(200);
            expect(widget00.height).toEqual(200);
            // 01
            expect(widget01.left).toEqual(200);
            expect(widget01.top).toEqual(0);
            expect(widget01.width).toEqual(200);
            expect(widget01.height).toEqual(200);
            // 10
            expect(widget10.left).toEqual(0);
            expect(widget10.top).toEqual(200);
            expect(widget10.width).toEqual(200);
            expect(widget10.height).toEqual(200);
            // 11
            expect(widget11.left).toEqual(200);
            expect(widget11.top).toEqual(200);
            expect(widget11.width).toEqual(200);
            expect(widget11.height).toEqual(200);

            container.vgap = 20;
            Invoke.later(() => {
                // 00
                expect(widget00.left).toEqual(0);
                expect(widget00.top).toEqual(0);
                expect(widget00.width).toEqual(200);
                expect(widget00.height).toEqual(200);
                // 01
                expect(widget01.left).toEqual(200);
                expect(widget01.top).toEqual(0);
                expect(widget01.width).toEqual(200);
                expect(widget01.height).toEqual(200);
                // 10
                expect(widget10.left).toEqual(0);
                expect(widget10.top).toEqual(200);
                expect(widget10.width).toEqual(200);
                expect(widget10.height).toEqual(200);
                // 11
                expect(widget11.left).toEqual(200);
                expect(widget11.top).toEqual(200);
                expect(widget11.width).toEqual(200);
                expect(widget11.height).toEqual(200);

                document.body.removeChild(container.element);
                done();
            });
        });
    });
    it('Anchors pane.Structure', done => {
        const container = new Anchors();
        expectContainer(container);
        expect(container.element).toBeDefined();

        const child0 = new Anchors();
        const child1 = new Anchors();
        const child2 = new Anchors();
        container.add(child0);
        container.add(child1, {left: 10, top: 10, width: 50, height: 50});
        child2.left = 70;
        child2.top = 10;
        child2.width = 50;
        child2.height = 50;
        container.add(child2);

        expect(container.count).toEqual(3);
        expect(container.child(0)).toEqual(child0);
        expect(container.child(1)).toEqual(child1);
        expect(container.child(2)).toEqual(child2);
        expect(container.children()).toEqual([child0, child1, child2]);
        expect(container.indexOf(child0)).toEqual(0);
        expect(container.indexOf(child1)).toEqual(1);
        expect(container.indexOf(child2)).toEqual(2);

        const removed0 = container.remove(0);
        expect(removed0).toBeDefined();
        const removed1 = container.remove(child1);
        expect(removed1).toBeDefined();

        container.clear();
        expect(container.count).toEqual(0);
        expect(container.child(0)).toEqual(null);
        expect(container.children()).toEqual([]);
        expect(container.indexOf(child0)).toEqual(-1);
        expect(container.indexOf(child1)).toEqual(-1);
        expect(container.indexOf(child2)).toEqual(-1);

        done();
    });
    it('Anchors pane.attached constraints', done => {
        const container = new Anchors();
        document.body.appendChild(container.element);

        const child0 = new Anchors();
        const child1 = new Anchors();
        const child2 = new Anchors();
        container.add(child0);
        {
            child1.left = 10;
            child1.top = 10;
            child1.width = 50;
            child1.height = 50;
        }
        container.add(child1);
        {
            child2.left = 70;
            child2.top = 10;
            child2.width = 50;
            child2.height = 50;
        }
        container.add(child2);

        Invoke.later(() => {
            expect(child0.left).toEqual(0);
            expect(child0.top).toEqual(0);
            expect(child0.width).toEqual(0);
            expect(child0.height).toEqual(0);
            expect(child1.left).toEqual(10);
            expect(child1.top).toEqual(10);
            expect(child1.width).toEqual(50);
            expect(child1.height).toEqual(50);
            expect(child2.left).toEqual(70);
            expect(child2.top).toEqual(10);
            expect(child2.width).toEqual(50);
            expect(child2.height).toEqual(50);
            document.body.removeChild(container.element);
            done();
        });
    });
    it('Anchors pane.attached constraints moving', done => {
        const container = new Anchors();
        container.width = container.height = 400;
        document.body.appendChild(container.element);

        const child0 = new Anchors();
        {
            child0.element.style.left = '10%';
            child0.element.style.top = '10%';
            child0.element.style.width = '50%';
            child0.element.style.height = '50%';
        }
        container.add(child0);
        const child1 = new Anchors();
        {
            child1.element.style.left = '10%';
            child1.element.style.top = '10%';
            child1.element.style.width = '50%';
            child1.element.style.height = '50%';
        }
        container.add(child1);
        const child2 = new Anchors();
        {
            child2.element.style.right = '10%';
            child2.element.style.bottom = '10%';
            child2.element.style.width = '50%';
            child2.element.style.height = '50%';
        }
        container.add(child2);

        Invoke.later(() => {
            // child0
            expect(child0.left).toEqual(40);
            child0.left += 26;
            expect(child0.left).toEqual(40 + 26);
            expect(child0.element.style.left).toEqual('16.5%');

            expect(child0.top).toEqual(40);
            child0.top += 26;
            expect(child0.top).toEqual(40 + 26);
            expect(child0.element.style.top).toEqual('16.5%');

            // child1
            expect(child1.width).toEqual(200);
            child1.width += 26;
            expect(child1.width).toEqual(200 + 26);
            expect(child1.element.style.width).toEqual('56.5%');

            expect(child1.height).toEqual(200);
            child1.height += 26;
            expect(child1.height).toEqual(200 + 26);
            expect(child1.element.style.height).toEqual('56.5%');

            // child2
            expect(child2.width).toEqual(200);
            child2.width -= 26;
            expect(child2.width).toEqual(200 - 26);
            expect(child2.element.style.width).toEqual('43.5%');

            expect(child2.height).toEqual(200);
            child2.height -= 26;
            expect(child2.height).toEqual(200 - 26);
            expect(child2.element.style.height).toEqual('43.5%');

            document.body.removeChild(container.element);
            done();
        });
    });
    it('Box pane.Structure', done => {
        const container = new Box();
        expectContainer(container);
        expect(container.element).toBeDefined();

        const child0 = new Box();
        const child1 = new Box();
        const child2 = new Box();
        container.add(child0);
        container.add(child1);
        container.add(child2);

        expect(container.count).toEqual(3);
        expect(container.child(0)).toEqual(child0);
        expect(container.child(1)).toEqual(child1);
        expect(container.child(2)).toEqual(child2);
        expect(container.children()).toEqual([child0, child1, child2]);
        expect(container.indexOf(child0)).toEqual(0);
        expect(container.indexOf(child1)).toEqual(1);
        expect(container.indexOf(child2)).toEqual(2);

        const removed0 = container.remove(0);
        expect(removed0).toBeDefined();
        const removed1 = container.remove(child1);
        expect(removed1).toBeDefined();

        container.clear();
        expect(container.count).toEqual(0);
        expect(container.child(0)).toEqual(null);
        expect(container.children()).toEqual([]);
        expect(container.indexOf(child0)).toEqual(-1);
        expect(container.indexOf(child1)).toEqual(-1);
        expect(container.indexOf(child2)).toEqual(-1);

        done();
    });
    it('Box pane.detached left top width height', done => {
        const container = new Box();
        container.width = container.height = 400;
        const child0 = new Box();
        const child1 = new Box();
        const child2 = new Box();
        container.add(child0);
        container.add(child1);
        container.add(child2);
        expect(child0.width).toEqual(0);
        expect(child1.width).toEqual(0);
        expect(child1.width).toEqual(0);
        expect(child0.height).toEqual(0);
        expect(child1.height).toEqual(0);
        expect(child1.height).toEqual(0);
        container.orientation = Ui.Orientation.VERTICAL;
        expect(child0.height).toEqual(0);
        expect(child1.height).toEqual(0);
        expect(child1.height).toEqual(0);
        expect(child0.width).toEqual(0);
        expect(child1.width).toEqual(0);
        expect(child1.width).toEqual(0);


        container.orientation = Ui.Orientation.HORIZONTAL;

        child0.left += 10;
        expect(child0.left).toEqual(0);
        child0.top += 10;
        expect(child0.top).toEqual(0);
        child0.width += 10;
        expect(child0.width).toEqual(10);
        child0.height += 10;
        expect(child0.height).toEqual(0);

        child0.width = 0;
        container.orientation = Ui.Orientation.VERTICAL;

        child0.left += 10;
        expect(child0.left).toEqual(0);
        child0.top += 10;
        expect(child0.top).toEqual(0);
        child0.width += 10;
        expect(child0.width).toEqual(0);
        child0.height += 10;
        expect(child0.height).toEqual(10);
        done();
    });
    it('Box pane.attached left top width height', done => {
        const container = new Box();
        document.body.appendChild(container.element);
        container.width = container.height = 400;
        const child0 = new Box();
        const child1 = new Box();
        const child2 = new Box();
        container.add(child0);
        container.add(child1);
        container.add(child2);
        expect(child0.width).toEqual(0);
        expect(child1.width).toEqual(0);
        expect(child1.width).toEqual(0);
        expect(child0.height).toEqual(400);
        expect(child1.height).toEqual(400);
        expect(child1.height).toEqual(400);
        container.orientation = Ui.Orientation.VERTICAL;
        expect(child0.height).toEqual(0);
        expect(child1.height).toEqual(0);
        expect(child1.height).toEqual(0);
        expect(child0.width).toEqual(400);
        expect(child1.width).toEqual(400);
        expect(child1.width).toEqual(400);

        container.orientation = Ui.Orientation.HORIZONTAL;

        child0.left += 10;
        expect(child0.left).toEqual(0);
        child0.top += 10;
        expect(child0.top).toEqual(0);
        child0.width += 10;
        expect(child0.width).toEqual(10);
        expect(child1.left).toEqual(10);

        expect(child0.height).toEqual(400);
        child0.height += 10;
        expect(child0.height).toEqual(400);

        child0.width = 0;
        expect(child1.left).toEqual(0);
        container.orientation = Ui.Orientation.VERTICAL;

        child0.left += 10;
        expect(child0.left).toEqual(0);
        child0.top += 10;
        expect(child0.top).toEqual(0);

        expect(child0.width).toEqual(0);// width of child0 is already in its tag's style
        child0.width += 10;
        expect(child0.width).toEqual(0); // width of child0 is already in its tag's style

        expect(child1.width).toEqual(400);
        child1.width += 10;
        expect(child1.width).toEqual(400);
        child0.height += 10;
        expect(child0.height).toEqual(10);
        expect(child1.top).toEqual(10);
        child0.height = 0;
        expect(child0.height).toEqual(0);
        expect(child1.top).toEqual(0);
        document.body.removeChild(container.element);
        done();
    });
    it('Box pane.attached hgap vgap orientation', done => {
        const container = new Box();
        document.body.appendChild(container.element);
        container.width = container.height = 400;
        const child0 = new Box();
        const child1 = new Box();
        container.add(child0);
        container.add(child1);

        container.hgap = 10;
        expect(child0.left).toEqual(0);
        expect(child1.left).toEqual(10);

        container.orientation = Ui.Orientation.VERTICAL;

        container.vgap = 10;
        expect(child0.top).toEqual(0);
        expect(child1.top).toEqual(10);

        document.body.removeChild(container.element);
        done();
    });
    it('Box by content horizontal vertical', done => {
        const box = new Box();
        document.body.appendChild(box.element);
        box.height = 400;
        const child0 = new Box();
        const child1 = new Box();
        box.add(child0);
        box.add(child1);
        child0.width = child1.width = 200;
        box.hgap = 10;
        expect(box.element.offsetWidth).toEqual(410);

        // cleanup
        box.height = null;
        child0.width = child1.width = null;
        box.orientation = Ui.Orientation.VERTICAL;

        box.width = 400;
        child0.height = child1.height = 200;
        box.vgap = 10;
        expect(box.element.offsetHeight).toEqual(410);

        document.body.removeChild(box.element);
        done();
    });
    it('Sized Box with horizontal and vertical scrolling', done => {
        const box = new Box();
        document.body.appendChild(box.element);
        box.width = box.height = 400;
        const child0 = new Box();
        const child1 = new Box();
        box.add(child0);
        box.add(child1);
        child0.width = child1.width = 200;
        box.hgap = 10;
        expect(box.element.offsetWidth).toEqual(400);
        expect(box.element.scrollWidth).toEqual(410);

        // cleanup
        child0.width = child1.width = null;
        box.orientation = Ui.Orientation.VERTICAL;

        child0.height = child1.height = 200;
        box.vgap = 10;
        expect(box.element.offsetHeight).toEqual(400);
        expect(box.element.scrollHeight).toEqual(410);

        document.body.removeChild(box.element);
        done();
    });
    it('Scroll pane.Structure', () => {
        const container = new Scroll();
        expectContainer(container);
        expect(container.element).toBeDefined();

        const child0 = new Scroll();
        const child1 = new Scroll();

        container.add(child0);
        expect(container.count).toEqual(1);
        expect(container.child(0)).toEqual(child0);
        expect(container.view).toEqual(child0);

        container.add(child1);
        expect(container.count).toEqual(1);
        expect(container.child(0)).toEqual(child1);
        expect(container.view).toEqual(child1);

        expect(container.children()).toEqual([child1]);
        expect(container.indexOf(child0)).toEqual(-1);
        expect(container.indexOf(child1)).toEqual(0);

        const removed0 = container.remove(0);
        expect(removed0).toBeDefined();
        expect(removed0).toEqual(child1);
        expect(container.count).toEqual(0);
        expect(container.children()).toEqual([]);
        expect(container.indexOf(child1)).toEqual(-1);
        expect(container.view).toBeNull();

        container.view = child0;
        const removed1 = container.remove(child0);
        expect(removed1).toBeDefined();
        expect(removed1).toEqual(child0);

        container.view = child1;
        expect(container.count).toEqual(1);
        expect(container.child(0)).toEqual(child1);

        container.clear();
        expect(container.count).toEqual(0);
        expect(container.child(0)).toEqual(null);
        expect(container.children()).toEqual([]);

        container.view = child0;
        expect(container.count).toEqual(1);
        expect(container.child(0)).toEqual(child0);

        container.view = null;
        expect(container.count).toEqual(0);
        expect(container.child(0)).toEqual(null);
        expect(container.children()).toEqual([]);
    });
    it('Scroll pane.detached left top width height', () => {
        const child = new ToggleButton();
        const container = new Scroll(child);
        expect(child.left).toEqual(0);
        child.left += 10;
        expect(child.left).toEqual(0);
        expect(child.top).toEqual(0);
        child.top += 10;
        expect(child.top).toEqual(0);
        expect(child.width).toEqual(0);
        child.width += 10;
        expect(child.width).toEqual(10);
        expect(child.height).toEqual(0);
        child.height += 10;
        expect(child.height).toEqual(10);
    });
    it('Scroll pane.attached left top width height', () => {
        const child = new Flow();
        const container = new Scroll(child);
        container.width = container.height = 400;
        document.body.appendChild(container.element);
        expect(child.width).toEqual(0);
        child.width += 10;
        expect(child.width).toEqual(10);
        expect(child.height).toEqual(0);
        child.height += 10;
        expect(child.height).toEqual(10);
        expect(child.left).toEqual(0);
        child.left += 10;
        expect(child.element.offsetLeft).toEqual(0);
        expect(child.top).toEqual(0);
        child.top += 10;
        expect(child.element.offsetTop).toEqual(0);
        document.body.removeChild(container.element);
    });
    it('Box in Scroll horizontal vertical', done => {
        const scroll = new Scroll();
        document.body.appendChild(scroll.element);
        scroll.width = scroll.height = 400;
        const box = new Box();
        scroll.view = box;
        const child0 = new Box();
        child0.width = 200;
        const child1 = new Box();
        child1.width = 200;
        box.add(child0);
        box.add(child1);
        box.hgap = 10;
        expect(box.element.offsetWidth).toEqual(410);

        // cleanup
        child0.width = null;
        child1.width = null;

        box.orientation = Ui.Orientation.VERTICAL;

        child0.height = 200;
        child1.height = 200;
        box.vgap = 10;
        expect(box.element.offsetHeight).toEqual(410);

        document.body.removeChild(scroll.element);
        done();
    });

    it('Toolbar.Structure', done => {
        const toolbar = new Toolbar();
        document.body.appendChild(toolbar.element);
        toolbar.height = 150;
        toolbar.width = 400;
        const tool0 = new Toolbar();
        tool0.width = 100;
        tool0.background = Ui.Color.black;
        const tool1 = new Toolbar();
        tool1.width = 100;
        tool1.background = Ui.Color.black;
        const tool2 = new Toolbar();
        tool2.width = 100;
        tool2.background = Ui.Color.black;
        const tool3 = new Toolbar();
        tool3.width = 100;
        tool3.background = Ui.Color.black;
        toolbar.add(tool0);
        toolbar.add(tool1);
        toolbar.add(tool2);
        toolbar.add(tool3);

        expect('orientation' in toolbar).toBeFalsy();
        expect('vgap' in toolbar).toBeFalsy();
        expect('hgap' in toolbar).toBeTruthy();

        expect(tool0.left).toEqual(0);
        expect(tool1.left).toEqual(100);
        expect(toolbar.element.childElementCount).toEqual(5);

        toolbar.hgap = 10;

        expect(tool0.left).toEqual(0);
        expect(tool1.left).toEqual(110);

        toolbar.remove(tool3);
        toolbar.add(tool3);
        Invoke.later(() => {
            expect(toolbar.element.childElementCount).toEqual(6);
            toolbar.element.scrollLeft = 50;
            Invoke.later(() => {
                expect(toolbar.element.childElementCount).toEqual(6);
                document.body.removeChild(toolbar.element);
                done();
            });
        });
    });
    it('Split pane.Structure', done => {
        const container = new Split();
        expectContainer(container);
        expect(container.element).toBeDefined();

        const child0 = new Split();
        const child1 = new Split();

        container.add(child0);
        expect(container.count).toEqual(1);
        expect(container.child(0)).toEqual(child0);
        expect(container.first).toEqual(child0);

        container.add(child1);
        expect(container.count).toEqual(2);
        expect(container.child(1)).toEqual(child1);
        expect(container.second).toEqual(child1);

        expect(container.children()).toEqual([child0, child1]);

        const removed0 = container.remove(0);
        expect(removed0).toBeDefined();
        expect(removed0).toEqual(child0);
        expect(container.count).toEqual(1);
        expect(container.children()).toEqual([child0]);

        expect(container.first).toBeNull();

        const removed1 = container.remove(0);
        expect(removed1).toBeDefined();
        expect(removed1).toEqual(child1);
        expect(container.count).toEqual(0);
        expect(container.children()).toEqual([]);

        expect(container.second).toBeNull();

        container.first = child0;
        expect(container.count).toEqual(1);
        expect(container.child(0)).toEqual(child0);
        container.second = child1;
        expect(container.count).toEqual(2);
        expect(container.child(1)).toEqual(child1);

        container.first = null;
        expect(container.count).toEqual(1);
        expect(container.child(0)).toEqual(child1);

        container.second = null;
        expect(container.count).toEqual(0);
        expect(container.children()).toEqual([]);

        container.first = child0;
        container.second = child1;
        expect(container.count).toEqual(2);
        expect(container.children()).toEqual([child0, child1]);
        container.clear();
        expect(container.count).toEqual(0);
        expect(container.children()).toEqual([]);
        expect(container.first).toBeNull();
        expect(container.second).toBeNull();

        done();
    });

    it('Split pane.detached left top width height', done => {
        const split = new Split();

        const first = new Split();
        const second = new Split();

        split.first = first;
        split.second = second;

        expect(first.left).toEqual(0);
        first.left += 10;
        expect(first.left).toEqual(0);

        expect(first.top).toEqual(0);
        first.top += 10;
        expect(first.top).toEqual(0);

        expect(first.width).toEqual(0);
        first.width += 10;
        expect(first.width).toEqual(0);

        expect(first.height).toEqual(0);
        first.height += 10;
        expect(first.height).toEqual(0);

        expect(second.left).toEqual(0);
        second.left += 10;
        expect(second.left).toEqual(0);

        expect(second.top).toEqual(0);
        second.top += 10;
        expect(second.top).toEqual(0);

        expect(second.width).toEqual(0);
        second.width += 10;
        expect(second.width).toEqual(0);

        expect(second.height).toEqual(0);
        second.height += 10;
        expect(second.height).toEqual(0);

        done();
    });
    it('Split pane.attached left top width height', done => {
        const split = new Split();
        split.width = split.height = 200;
        document.body.appendChild(split.element);

        const first = new Split();
        const second = new Split();

        split.dividerLocation = 100;

        split.second = second;

        Invoke.later(() => {

            expect(second.left).toEqual(110);
            second.left += 10;
            expect(second.left).toEqual(110);

            expect(second.top).toEqual(0);
            second.top += 10;
            expect(second.top).toEqual(0);

            expect(second.width).toEqual(90);
            second.width += 10;
            expect(second.width).toEqual(90);

            expect(second.height).toEqual(200);
            second.height += 10;
            expect(second.height).toEqual(200);

            split.first = first;

            Invoke.later(() => {

                expect(first.left).toEqual(0);
                first.left += 10;
                expect(first.left).toEqual(0);

                expect(first.top).toEqual(0);
                first.top += 10;
                expect(first.top).toEqual(0);

                expect(first.width).toEqual(100);
                first.width += 10;
                expect(first.width).toEqual(100);

                expect(first.height).toEqual(200);
                first.height += 10;
                expect(first.height).toEqual(200);
                split.orientation = Ui.Orientation.VERTICAL;

                document.body.removeChild(split.element);
                done();
            });
        });
    });
    it('Holy grail pane.Structure', () => {
        const holyGrail = new Grail();
        expectContainer(holyGrail);
        expect(holyGrail.element).toBeDefined();

        const topChild = new Grail();
        const leftChild = new Grail();
        const centerChild = new Grail();
        const rightChild = new Grail();
        const bottomChild = new Grail();

        holyGrail.header = topChild;
        expect(holyGrail.count).toEqual(1);
        expect(holyGrail.child(0)).toEqual(topChild);
        expect(holyGrail.header).toEqual(topChild);

        holyGrail.leftSide = leftChild;
        expect(holyGrail.count).toEqual(2);
        expect(holyGrail.child(1)).toEqual(leftChild);
        expect(holyGrail.leftSide).toEqual(leftChild);

        holyGrail.content = centerChild;
        expect(holyGrail.count).toEqual(3);
        expect(holyGrail.child(2)).toEqual(centerChild);
        expect(holyGrail.content).toEqual(centerChild);

        holyGrail.rightSide = rightChild;
        expect(holyGrail.count).toEqual(4);
        expect(holyGrail.child(3)).toEqual(rightChild);
        expect(holyGrail.rightSide).toEqual(rightChild);

        holyGrail.footer = bottomChild;
        expect(holyGrail.count).toEqual(5);
        expect(holyGrail.child(4)).toEqual(bottomChild);
        expect(holyGrail.footer).toEqual(bottomChild);

        expect(holyGrail.children()).toEqual([topChild, leftChild, centerChild, rightChild, bottomChild]);

        const removed0 = holyGrail.remove(0);
        expect(removed0).toBeDefined();
        expect(removed0).toEqual(topChild);
        expect(holyGrail.count).toEqual(4);
        expect(holyGrail.children()).toEqual([leftChild, centerChild, rightChild, bottomChild]);

        expect(holyGrail.header).toBeNull();

        holyGrail.header = topChild;
        expect(holyGrail.count).toEqual(5);
        expect(holyGrail.child(holyGrail.count - 1)).toEqual(topChild);
        expect(holyGrail.header).toEqual(topChild);

        holyGrail.clear();
        expect(holyGrail.count).toEqual(0);
        expect(holyGrail.children()).toEqual([]);
        expect(holyGrail.header).toBeNull();
        expect(holyGrail.leftSide).toBeNull();
        expect(holyGrail.content).toBeNull();
        expect(holyGrail.rightSide).toBeNull();
        expect(holyGrail.footer).toBeNull();

        holyGrail.content = centerChild;
        const headerChild1 = new Grail();
        holyGrail.add(headerChild1);
        expect(holyGrail.header).toEqual(headerChild1);

        holyGrail.rightSide = rightChild;
        const rightChild1 = new Grail();
        const oldRight = holyGrail.add(rightChild1, Ui.HorizontalPosition.RIGHT);
        expect(oldRight).toEqual(rightChild);
    });
    it('Holy grail pane.attached left top width height', done => {
        const holyGrail = new Grail();
        holyGrail.background = Color.blue;
        holyGrail.width = holyGrail.height = 400;
        document.body.appendChild(holyGrail.element);

        const topChild = new Grail();
        topChild.height = 50;
        topChild.background = Color.black;

        const leftChild = new Grail();
        leftChild.width = 50;
        leftChild.background = Color.black;

        const centerChild = new Grail();
        centerChild.background = Color.black;

        const rightChild = new Grail();
        //rightChild.width = 50; moved to third argument 'add' call
        rightChild.background = Color.black;

        const bottomChild = new Grail();
        bottomChild.height = 50;
        bottomChild.background = Color.black;

        holyGrail.header = topChild;
        holyGrail.leftSide = leftChild;
        holyGrail.content = centerChild;
        //borders.rightSide = rightChild;
        holyGrail.add(rightChild, Ui.HorizontalPosition.RIGHT, 50);
        holyGrail.footer = bottomChild;

        Invoke.later(() => {
            // top
            expect(topChild.width).toEqual(400);
            topChild.width += 10;
            expect(topChild.width).toEqual(400);
            expect(topChild.height).toEqual(50);
            topChild.height += 10;
            expect(topChild.height).toEqual(60);
            expect(topChild.left).toEqual(0);
            topChild.left += 10;
            expect(topChild.left).toEqual(0);
            expect(topChild.top).toEqual(0);
            topChild.top += 10;
            expect(topChild.top).toEqual(0);
            // bottom
            expect(bottomChild.width).toEqual(400);
            bottomChild.width += 10;
            expect(bottomChild.width).toEqual(400);
            expect(bottomChild.height).toEqual(50);
            bottomChild.height += 10;
            expect(bottomChild.height).toEqual(60);
            expect(bottomChild.left).toEqual(0);
            bottomChild.left += 10;
            expect(bottomChild.left).toEqual(0);
            expect(bottomChild.top).toEqual(340);
            bottomChild.top += 10;
            expect(bottomChild.top).toEqual(340);
            // left
            expect(leftChild.width).toEqual(50);
            leftChild.width += 10;
            expect(leftChild.width).toEqual(60);
            expect(leftChild.height).toEqual(280);
            leftChild.height += 10;
            expect(leftChild.height).toEqual(280);
            expect(leftChild.left).toEqual(0);
            leftChild.left += 10;
            expect(leftChild.left).toEqual(0);
            expect(leftChild.top).toEqual(60);
            leftChild.top += 10;
            expect(leftChild.top).toEqual(60);
            // right
            expect(rightChild.width).toEqual(50);
            rightChild.width += 10;
            expect(rightChild.width).toEqual(60);
            expect(rightChild.height).toEqual(280);
            rightChild.height += 10;
            expect(rightChild.height).toEqual(280);
            expect(rightChild.left).toEqual(340);
            rightChild.left += 10;
            expect(rightChild.left).toEqual(340);
            expect(rightChild.top).toEqual(60);
            rightChild.top += 10;
            expect(rightChild.top).toEqual(60);
            // center
            expect(centerChild.width).toEqual(280);
            centerChild.width += 10;
            expect(centerChild.width).toEqual(280);
            expect(centerChild.height).toEqual(280);
            centerChild.height += 10;
            expect(centerChild.height).toEqual(280);
            expect(centerChild.left).toEqual(60);
            centerChild.left += 10;
            expect(centerChild.left).toEqual(60);
            expect(centerChild.top).toEqual(60);
            centerChild.top += 10;
            expect(centerChild.top).toEqual(60);

            document.body.removeChild(holyGrail.element);
            done();
        });
    });
    it('Borders pane.attached hgap vgap', done => {
        const borders = new Grail(10);
        borders.background = Color.blue;
        borders.width = borders.height = 400;
        document.body.appendChild(borders.element);

        const topChild = new Grail();
        topChild.height = 50;
        topChild.background = Color.black;

        const leftChild = new Grail();
        leftChild.width = 50;
        leftChild.background = Color.black;

        const centerChild = new Grail();
        centerChild.background = Color.black;

        const rightChild = new Grail();
        rightChild.width = 50;
        rightChild.background = Color.black;

        const bottomChild = new Grail();
        bottomChild.height = 50;
        bottomChild.background = Color.black;

        borders.header = topChild;
        borders.leftSide = leftChild;
        borders.content = centerChild;
        borders.rightSide = rightChild;
        borders.footer = bottomChild;

        expect(borders.vgap).toEqual(0);
        borders.vgap = 10;

        Invoke.later(() => {
            // top
            expect(topChild.width).toEqual(400);
            expect(topChild.height).toEqual(50);
            expect(topChild.left).toEqual(0);
            expect(topChild.top).toEqual(0);
            // bottom
            expect(bottomChild.width).toEqual(400);
            expect(bottomChild.height).toEqual(50);
            expect(bottomChild.left).toEqual(0);
            expect(bottomChild.top).toEqual(350);
            // left
            expect(leftChild.width).toEqual(50);
            expect(leftChild.height).toEqual(280);
            expect(leftChild.left).toEqual(0);
            expect(leftChild.top).toEqual(60);
            // right
            expect(rightChild.width).toEqual(50);
            expect(rightChild.height).toEqual(280);
            expect(rightChild.left).toEqual(350);
            expect(rightChild.top).toEqual(60);
            // center
            expect(centerChild.width).toEqual(280);
            expect(centerChild.height).toEqual(280);
            expect(centerChild.left).toEqual(60);
            expect(centerChild.top).toEqual(60);

            document.body.removeChild(borders.element);
            done();
        });
    });

    it('TabbedPane.Structure', done => {
        const tabs = new TabbedPane();
        expectContainer(tabs);
        const tab0 = new TabbedPane();
        const tab1 = new TabbedPane();
        const tab2 = new TabbedPane();
        Resource.Icon.load('base/assets/binary-content.png')
                .then(loaded => {
                    tabs.add(tab0, tabs.count, 'tab1', loaded, 'tooltip1');
                    tabs.add(tab1, tabs.count, 'tab2', loaded, 'tooltip2');
                    tabs.add(tab2, tabs.count, 'tab3', loaded, 'tooltip3');
                    expect(tabs.count).toEqual(3);
                    expect(tabs.child(0)).toEqual(tab0);
                    expect(tabs.child(1)).toEqual(tab1);
                    expect(tabs.child(2)).toEqual(tab2);
                    expect(tabs.indexOf(tab0)).toEqual(0);
                    expect(tabs.indexOf(tab1)).toEqual(1);
                    expect(tabs.indexOf(tab2)).toEqual(2);
                    expect(tabs.children()).toEqual([tab0, tab1, tab2]);
                    tabs.remove(tab1);
                    expect(tabs.indexOf(tab0)).toEqual(0);
                    expect(tabs.indexOf(tab2)).toEqual(1);
                    expect(tabs.children()).toEqual([tab0, tab2]);
                    expect(tabs.indexOf(tab0)).toEqual(0);
                    expect(tabs.indexOf(tab1)).toEqual(-1);
                    expect(tabs.indexOf(tab2)).toEqual(1);
                    tabs.clear();
                    expect(tabs.count).toEqual(0);
                    expect(tabs.indexOf(tab0)).toEqual(-1);
                    expect(tabs.indexOf(tab1)).toEqual(-1);
                    expect(tabs.indexOf(tab2)).toEqual(-1);
                    expect(tabs.children()).toEqual([]);
                })
                .then(done);
    });
    it('TabbedPane.Markup', done => {
        const tabs = new TabbedPane();
        tabs.onSelect = evt => {
            Logger.info(`Tab selected on: ${evt.source.constructor.name}`);
        };
        document.body.appendChild(tabs.element);
        const tab0 = new Flow();
        tab0.background = '#bcbcfc';
        tab0.width = 250;
        tab0.height = 200;
        const tab1 = new Flow();
        tab1.background = '#fcacac';
        tab1.width = 200;
        tab1.height = 250;
        const tab2 = new Flow();
        tabs.add(tab0, tabs.count, 'tab0', null, 'tooltip0');
        expect(tab0.tab.title).toEqual('tab0');
        expect(tab0.tab.icon).toBeNull();
        expect(tab0.tab.toolTipText).toEqual('tooltip0');


        tabs.add(tab2);
        tab2.tab.title = 'tab2';
        const newIcon = document.createElement('div');
        tab2.tab.icon = newIcon;
        tab2.tab.toolTipText = 'tooltip2';
        expect(tab2.tab.title).toEqual('tab2');
        expect(tab2.tab.icon).toBe(newIcon);
        expect(tab2.tab.toolTipText).toEqual('tooltip2');

        Resource.Icon.load('base/assets/binary-content.png')
                .then(loaded => {
                    tabs.add(tab1, 1, 'tab1', loaded, 'tooltip1');
                    expect(tab1.tab.icon).toBe(loaded);
                    expect(tabs.children()).toEqual([tab0, tab1, tab2]);
                    // document.body.removeChild(tabs.element);
                })
                .then(done);
    });
    it('TextArea.ScrollPane.Markup', done => {
        const textArea = new TextArea();
        const scroll = new Scroll(textArea);
        const scroll1 = new Scroll(scroll);
        document.body.appendChild(scroll1.element);
        textArea.text =
                'Sample text for text area, ' +
                'Sample text for text area, ' +
                'Sample text for text area, ' +
                'Sample text for text area';
        Invoke.later(() => {
            expect(textArea.element.offsetWidth).toEqual(scroll.element.offsetWidth);
            expect(textArea.element.offsetHeight).toEqual(scroll.element.offsetHeight);
            expect(scroll1.element.offsetWidth).toEqual(scroll.element.offsetWidth);
            expect(scroll1.element.offsetHeight).toEqual(scroll.element.offsetHeight);
            expect(textArea.width).toEqual(scroll.width); // .p-scroll should be same size as parent .p-scroll
            const oldScrollWidth = scroll.width;
            const oldTextAreaWidth = textArea.width;
            scroll.width -= 10;
            textArea.width -= 10;
            expect(scroll.width).toEqual(oldScrollWidth);
            expect(textArea.width).toEqual(scroll.width); // .p-scroll should be same size as parent .p-scroll
            document.body.removeChild(scroll1.element);
            done();
        });
    });
    it('RichTextArea.ScrollPane.Markup', done => {
        const textArea = new RichTextArea();
        const scroll = new Scroll(textArea);
        const scroll1 = new Scroll(scroll);
        document.body.appendChild(scroll1.element);
        textArea.text =
                'Sample text for text area, ' +
                'Sample text for text area, ' +
                'Sample text for text area, ' +
                'Sample text for text area';
        Invoke.later(() => {
            expect(textArea.element.offsetWidth).toEqual(scroll.element.offsetWidth);
            expect(textArea.element.offsetHeight).toEqual(scroll.element.offsetHeight);
            expect(scroll1.element.offsetWidth).toEqual(scroll.element.offsetWidth);
            expect(scroll1.element.offsetHeight).toEqual(scroll.element.offsetHeight);
            expect(textArea.width).toEqual(scroll.width); // .p-scroll should be same size as parent .p-scroll
            const oldScrollWidth = scroll.width;
            scroll.width -= 10;
            textArea.width -= 10;
            expect(scroll.width).toEqual(oldScrollWidth);
            expect(textArea.width).toEqual(scroll.width); // .p-scroll should be same size as parent .p-scroll
            document.body.removeChild(scroll1.element);
            done();
        });
    });
    it('Box.Horizontal.ScrollPane.Markup', done => {
        const box = new Box();
        const scroll = new Scroll(box);
        scroll.width = scroll.height = 400;
        document.body.appendChild(scroll.element);
        Invoke.later(() => {
            expect(box.element.offsetHeight).toEqual(scroll.element.offsetHeight);
            const oldHeight = box.height;
            box.height -= 10;
            expect(box.height).toEqual(oldHeight);
            document.body.removeChild(scroll.element);
            done();
        });
    });
    it('Box.Vertical.ScrollPane.Markup', done => {
        const box = new Box();
        box.orientation = Ui.Orientation.VERTICAL;
        const scroll = new Scroll(box);
        scroll.width = scroll.height = 400;
        document.body.appendChild(scroll.element);
        Invoke.later(() => {
            expect(box.element.offsetWidth).toEqual(scroll.element.offsetWidth);
            const oldWidth = box.width;
            box.width -= 10;
            expect(box.width).toEqual(oldWidth);
            document.body.removeChild(scroll.element);
            done();
        });
    });
    it('ButtonGroup.Structure', () => {
        const check = new CheckBox('Check');
        const radio = new RadioButton('Radio');
        const toggle = new ToggleButton('Toggle');

        const group = new ButtonGroup();

        group.onAdded = evt => {
            Logger.info(`added ${evt.target.constructor.name} | ${evt.child.constructor.name}`);
        };

        group.onRemoved = evt => {
            Logger.info(`removed ${evt.target.constructor.name} | ${evt.child.constructor.name}`);
        };

        group.add(check);
        group.add(radio);
        group.add(toggle);
        expect(group.count).toEqual(3);
        expect(group.children()).toEqual([check, radio, toggle]);
        expect(group.indexOf(check)).toEqual(0);
        expect(group.indexOf(radio)).toEqual(1);
        expect(group.indexOf(toggle)).toEqual(2);
        expect(check.buttonGroup).toBe(group);
        expect(radio.buttonGroup).toBe(group);
        expect(toggle.buttonGroup).toBe(group);

        group.remove(check);
        expect(group.count).toEqual(2);
        expect(group.children()).toEqual([radio, toggle]);
        group.remove(radio);
        expect(group.count).toEqual(1);
        expect(group.children()).toEqual([toggle]);
        group.remove(toggle);
        expect(group.count).toEqual(0);
        expect(group.children()).toEqual([]);
        expect(check.buttonGroup).toBeNull();
        expect(radio.buttonGroup).toBeNull();
        expect(toggle.buttonGroup).toBeNull();

        check.buttonGroup = group;
        radio.buttonGroup = group;
        toggle.buttonGroup = group;
        expect(group.count).toEqual(3);
        expect(group.children()).toEqual([check, radio, toggle]);
        let met = 0;
        group.forEach(() => {
            met++;
        });
        expect(met).toEqual(3);

        group.clear();
        expect(group.count).toEqual(0);
        expect(group.children()).toEqual([]);
        expect(check.buttonGroup).toBeNull();
        expect(radio.buttonGroup).toBeNull();
        expect(toggle.buttonGroup).toBeNull();
    });
    it('ButtonGroup.Markup', done => {
        const check = new CheckBox('Check');
        const radio = new RadioButton('Radio');
        const toggle = new ToggleButton('Toggle');

        document.body.appendChild(check.element);
        document.body.appendChild(radio.element);
        document.body.appendChild(toggle.element);

        const group = new ButtonGroup();
        group.add(check);
        group.add(radio);
        group.add(toggle);

        group.onSelect = evt => {
            Logger.info(`selected ${evt.target.constructor.name}`);
        };

        spyOn(group, 'onSelect').and.callThrough();

        check.selected = true;
        radio.selected = true;
        toggle.selected = true;

        Invoke.later(() => {
            Invoke.later(() => {
                expect(group.onSelect.calls.count()).toEqual(3);
                document.body.removeChild(check.element);
                document.body.removeChild(radio.element);
                document.body.removeChild(toggle.element);
                done();
            });
        });
    });
});

