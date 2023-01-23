import Container from 'kenga/container';

export default class VBox extends Container {
  hgap: number | string;
  vgap: number | string;
  align: 'center' | 'left' | 'right' | 'fit';
}
