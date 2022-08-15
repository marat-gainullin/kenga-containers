import Utils from 'kenga/utils';
import Widget from 'kenga/widget';
import Container from 'kenga/container';
import ChangeEvent from './events/change-event';

export default class Split extends Container {
  orientation: Utils.Orientation;
  first: Widget;
  second: Widget;
  dividerLocation: number | string;
  expandable: boolean;
  expanded: boolean;
  collapsible: boolean;
  collapsed: boolean;
  expander: HTMLElement;
  dividerCollapse: HTMLElement;

  collapse(): void;
  expand(): void;
  restore(): void;

  addDividerLocationChangeHandler(handler: (evt: ChangeEvent) => void): { removeHandler: () => void };
  onDividerLocationChange: (evt: ChangeEvent) => void;
  fireDividerLocationChanged(): void;

  addExpandHandler(handler: (evt: ChangeEvent) => void): { removeHandler: () => void };
  onExpanded: (evt: ChangeEvent) => void;
  fireExpanded(): void;

  addCollapseHandler(handler: (evt: ChangeEvent) => void): { removeHandler: () => void };
  onCollapsed: (evt: ChangeEvent) => void;
  fireCollapsed(): void;

  addRestoreHandler(handler: (evt: ChangeEvent) => void): { removeHandler: () => void };
  onRestored: (evt: ChangeEvent) => void;
  fireRestored(): void;
}
