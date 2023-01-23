import Container from 'kenga/container';

export default class HBox extends Container {
  hgap: number | string;
  vgap: number | string;
  align: 'center' | 'top' | 'bottom' | 'fit';
}
