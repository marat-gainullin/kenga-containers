import Widget from 'kenga/widget';
import Anchors from './anchors-pane';

export default class DesktopPane extends Anchors {

  readonly forms: Widget[];
  readonly shown: Widget[];

  getShownForm(key: any): Widget;

  minimizeAll(): void;
  maximizeAll(): void;
  restoreAll(): void;
  closeAll(): void;

  platformLocationLeft: number;
  platformLocationTop: number;
}
