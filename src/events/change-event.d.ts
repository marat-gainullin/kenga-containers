import Event from 'kenga/event';

export default class ChangeEvent extends Event {
  oldValue: any;
  newValue: any;
}
