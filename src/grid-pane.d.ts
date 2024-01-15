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

  rows: number | string
  columns: number | string
}
