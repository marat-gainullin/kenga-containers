import Widget from 'kenga/widget';
import Container from 'kenga/container';

export default class HolyGrailPane extends Container {
  hgap: number | string;
  vgap: number | string;

  add(w: Widget, aPlace?: 'center' | 'left' | 'right' | 'top' | 'bottom', aSize?: number): void;

  header: Widget;
  leftSide: Widget;
  content: Widget;
  rightSide: Widget;
  footer: Widget;
}
