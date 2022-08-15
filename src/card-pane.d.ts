import Widget from 'kenga/widget';
import ItemEvent from 'kenga/events/item-event';
import Container from 'kenga/container';

export default class Cards extends Container {
  hgap: number | string;
  vgap: number | string;

  show(toBeShown: Widget): void;
  readonly selected: Widget;
  readonly selectedIndex: number;

  addSelectHandler(handler: (evt: ItemEvent) => void): { removeHandler: () => void };
  onSelect: (evt: ItemEvent) => void;
}
