import Event from 'kenga/event';

class ChangeEvent extends Event {
    constructor(w, oldValue, newValue) {
        super(w, w);
        Object.defineProperty(this, 'newValue', {
            get: function() {
                return newValue;
            }
        });
        Object.defineProperty(this, 'oldValue', {
            get: function() {
                return oldValue;
            }
        });
    }
}

export default ChangeEvent;