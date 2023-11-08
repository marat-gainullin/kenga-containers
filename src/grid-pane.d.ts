import Widget from 'kenga/widget';
import Container from 'kenga/container';

/**
 * A container with Grid Layout.
 * @param rows the number of grid rows.
 * @param columns the number of grid columns.
 */
export default class GridPane extends Container {
  hgap: number | string
  vgap: number | string

  child(row: number, col: number): Widget;
  add(w: Widget, row: number, col: number): void;
  remove(widgetOrRow: Widget | number, column: number): Widget;
}
