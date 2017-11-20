/* eslint-env node */
'use strict';

module.exports = {
    name: 'ember-unified-select',
    isDevelopingAddon() {
        return true;
    },
    included: function(app) {
        app.import('vendor/unified-select.css');
        this._super.included.call(this, app);
    },
};
