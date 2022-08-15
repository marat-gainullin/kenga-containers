import Widget from 'kenga/widget';
import SelectionEvent from 'kenga/events/item-event';
import ContainerEvent from 'kenga/events/container-event';

export default class ButtonGroup {
  addSelectHandler(handler: (evt: SelectionEvent) => void): { removeHandler: () => void };
  onSelect: (evt: SelectionEvent) => void;

  readonly count: number;
  child(index: number): Widget;
  children(): Widget[];
  forEach(action: (child: Widget) => void): void;
  indexOf(child: Widget): number;
  add(w: Widget, beforeIndex: number): void;
  remove(child: Widget): Widget;
  clear(): void;

  addAddHandler(handler: (evt: ContainerEvent) => void): { removeHandler: () => void };
  onAdd: (evt: ContainerEvent) => void;

  addRemoveHandler(handler: (evt: ContainerEvent) => void): { removeHandler: () => void };
  onRemove: (evt: ContainerEvent) => void;
}
