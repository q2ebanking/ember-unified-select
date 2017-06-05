import Ember from 'ember';

const {$, computed: {equal}, set, get, Mixin} = Ember;

function NOOP() {}

export default Mixin.create({
    isFocused: false,

    onClickElsewhere: NOOP,

    isDisabled: equal('onClickElsewhere', NOOP),

    _clickHandler(event) {
        var element = get(this, 'element'),
            isFocused = $.contains(element, document.activeElement),
            isThisElement = $(event.target).closest(element).length === 1;
        if (!isThisElement && (get(this, 'isFocused') || isFocused)) {
            set(this, 'isFocused', false);
            return this.onClickElsewhere(event, element);
        } else {
            set(this, 'isFocused', isThisElement || isFocused);
        }
    },
    _boundHandler: null,

    didInsertElement() {
        this._super();
        if (get(this, 'isDisabled')) {
            return;
        }
        set(this, '_boundHandler', this._clickHandler.bind(this));
        return $(document).bind('mousedown dragstart touchstart', get(this, '_boundHandler'));
    },

    willDestroy() {
        if (!get(this, 'isDisabled')) {
            $(document).unbind('mousedown dragstart touchstart', get(this, '_boundHandler'));
        }
        return this._super();
    }
});
