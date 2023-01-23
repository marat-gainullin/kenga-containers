import Widget from 'kenga/widget';
import Container from 'kenga/container';

export default class Scroll extends Container {
  horizontalScrollBarPolicy: 'allways' | 'never' | 'auto';
  verticalScrollBarPolicy: 'allways' | 'never' | 'auto';
  view: Widget;
}
