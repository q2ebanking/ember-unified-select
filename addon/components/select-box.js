import Ember from 'ember';
import clickElsewhere from '../mixins/click-elsewhere';

const { get, set, computed, computed: {and, empty, filterBy, gt, map, not }, run: {next, debounce}, Component } = Ember;

export default Component.extend(clickElsewhere, {
    classNames: ['select-box'],
    value: null,
    options: [],
    disabled: null,
    nativeSelect: false,
    placeholder: '',
    selected: '',
    dropdownOpen: false,

    valueKey: 'name',
    displayKey: 'name',
    isDeepOptions: computed('options', 'displayKey', 'valueKey', function () {
        let display = get(this, `options.0.${get(this, 'displayKey')}`);
        let value = get(this, `options.0.${get(this, 'valueKey')}`);
        return !(display === undefined && value === undefined);
    }),
    selectedDisplay: computed('selected', 'filterableOptions', 'valueKey', 'displayKey', 'isDeepOptions', function () {
        if (get(this, 'isDeepOptions') && get(this, 'selected')) {
            const selectedOption = get(this, 'filterableOptions').findBy(get(this, 'valueKey'), get(this, 'selected'));
            return get(selectedOption, get(this, 'displayKey'));
        } else {
            return get(this, 'selected');
        }
    }),

    emptyOptions: empty('options'),

    showMobileSearch: false,
    searchableOptions: gt('options.length', 10),
    queryString: '',
    filterableOptions: map('options', function (option) {
        if (get(this, 'isDeepOptions')) {
            set(option, 'filtered', true);
            return option;
        } else {
            return { val: option, filtered: true};
        }
    }),
    filteredOptions: filterBy('filterableOptions', 'filtered', true),
    noFilteredResults: empty('filteredOptions'),

    isMobileOrTablet: not('media.isDesktop'),
    showMobileOverlay: and('dropdownOpen', 'options.length', 'isMobileOrTablet'),
    showMobileHeader: and('dropdownOpen', 'label', 'isMobileOrTablet'),
    showEmptyState: and('noFilteredResults', 'isMobileOrTablet'),

    closeDropdown() {
        if (get(this, 'dropdownOpen')) {
            set(this, 'dropdownOpen', false);
            set(this, 'showMobileSearch', false);
        }
    },
    openDropdown() {
        if (!get(this, 'dropdownOpen')) {
            set(this, 'dropdownOpen', true);
            let selected = this.$('.select-box__dropdown-list a.selected');
            let firstItem = this.$('.select-box__dropdown-list li:first-child a');
            let focusTarget = selected.length === 1 ? selected : firstItem;
            next(() => focusTarget.focus());
        }
    },
    focusNextLi() {
        let focused = this.$('.select-box__dropdown-list a:focus');
        let dropdownItem = this.$('.select-box__dropdown-list a');
        let nextFocus = this.$(focused).parent().next(dropdownItem).children('a');
        this.$(nextFocus).focus();
    },
    focusPrevLi() {
        let focused = this.$('.select-box__dropdown-list a:focus');
        let dropdownItem = this.$('.select-box__dropdown-list a');
        let prevFocus = this.$(focused).parent().prev(dropdownItem).children('a');
        this.$(prevFocus).focus();
    },
    onClickElsewhere() {
        this.closeDropdown();
    },

    filterOptions(key) {
        let queryString = get(this, 'queryString');
        if (get(this, 'media.isDesktop')) {
            queryString = queryString + key;
            set(this, 'queryString', queryString);
        }
        get(this, 'filterableOptions').find((option) => {
            let display = get(this, 'isDeepOptions') ? option[get(this, 'displayKey')] : option.val;
            if (display.toLowerCase().indexOf(queryString.toLowerCase()) === 0) {
                set(option, 'filtered', true);
            } else {
                set(option, 'filtered', false);
            }
        });
        next(() => {
            if (get(this, 'media.isDesktop') && this.$('.select-box__dropdown-list a.filtered').length > 0) {
                this.$('.select-box__dropdown-list a.filtered')[0].focus();
            }
        });
    },
    clearFilter() {
        set(this, 'queryString', '');
        get(this, 'filterableOptions').setEach('filtered', true);
    },

    keyDown(e) {
        const key = e.key;
        if (key && !get(this, 'nativeSelect')) {
            switch (key) {
                case "Tab":
                    this.closeDropdown();
                    break;
                case "Enter":
                    break;
                case "Shift":
                    break;
                case "Escape":
                    break;
                case " "://Space
                    e.preventDefault();
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    this.openDropdown();
                    this.focusPrevLi();
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    this.openDropdown();
                    this.focusNextLi();
                    break;
                default:
                    this.openDropdown();
                    next(() => this.filterOptions(key));
                    if (get(this, 'media.isDesktop')) {
                        debounce(this, this.clearFilter, 300);
                    }
            }
        }
    },

    actions: {
        selectItem(option) {
            let value = option[get(this, 'valueKey')] || option;
            set(this, 'selected', value);
            this.attrs.onchange(value);
            this.closeDropdown();
            this.$('.select-box__dropdown').focus();
        },
        open() {
            this.openDropdown();
        },
        close() {
            this.closeDropdown();
        },
        searchOptions() {
            this.toggleProperty('showMobileSearch');
        },
        clearQuery() {
            this.clearFilter();
        }
    }
});
