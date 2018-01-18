import Ember from 'ember';

const {$, computed: { equal }, set, get, Mixin} = Ember;

function NOOP() {}

export default Mixin.create({
    isFocused: false,

    onClickElsewhere: NOOP,

    isDisabled: equal('onClickElsewhere', NOOP),

    _clickHandler(event) {
        let element = get(this, 'element');
        let isFocused = $.contains(element, document.activeElement);
        let isThisElement = $(event.target).closest(element).length === 1;

        if (!isThisElement && (get(this, 'isFocused') || isFocused)) {
            set(this, 'isFocused', false);
            return this.onClickElsewhere(event, element);
        } else {
            set(this, 'isFocused', isThisElement || isFocused);
        }
    },
    _boundHandler: null,

    didInsertElement() {
        this._super(...arguments);
        if (!get(this, 'isDisabled')) {
            $(document).on('mousedown dragstart touchstart', () => get(this, '_clickHandler'));
        }
    },

    willDestroyElement() {
        this._super(...arguments);
        if (!get(this, 'isDisabled')) {
            $(document).off('mousedown dragstart touchstart');
        }
    }
});
