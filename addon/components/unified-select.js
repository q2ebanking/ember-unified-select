import Ember from 'ember';
import clickElsewhere from '../mixins/click-elsewhere';

const {
    get,
    set,
    computed,
    computed: {
        and,
        empty,
        filterBy,
        gt,
        map,
        not
    },
    run: {
        next,
        debounce
    },
    Component
} = Ember;

export default Component.extend(clickElsewhere, {
    classNames: ['unified-select'],
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
        const isDeepOptions = get(this, 'isDeepOptions');
        const selected = get(this, 'selected');
        const filterableOptions = get(this, 'filterableOptions');
        const valueKey = get(this, 'valueKey');
        const displayKey = get(this, 'displayKey');

        return isDeepOptions ? get(filterableOptions.findBy(valueKey, selected), displayKey) : selected;
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

    closeDropdown(retainFocus = true) {
        set(this, 'dropdownOpen', false);
        set(this, 'showMobileSearch', false);

        if (retainFocus) {
            next(() => this.$('.unified-select-dropdown').focus());
        }
    },
    openDropdown() {
        set(this, 'dropdownOpen', true);
        let selected = this.$('.unified-select-dropdown-list a.selected');
        let firstItem = this.$('.unified-select-dropdown-list li:first-child a');
        let focusTarget = selected.length === 1 ? selected : firstItem;
        next(() => focusTarget.focus());
    },
    toggleDropdown() {
        if (get(this, 'dropdownOpen')) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    },
    selectOption(option, closeOnSelect = true) {
        let value = option[get(this, 'valueKey')] || option;
        const isOpen = get(this, 'dropdownOpen');
        set(this, 'selected', value);
        this.onchange(value);
        if (isOpen && closeOnSelect) {
            this.closeDropdown();
        }
    },
    selectAdjacentOption(direction) {
        const isOpen = get(this, 'dropdownOpen');
        const isDeepOptions = get(this, 'isDeepOptions');
        const filterableOptions = get(this, 'filterableOptions');
        const valueKey = isDeepOptions ? get(this, 'valueKey') : 'val';
        const selected = get(this, 'selected');
        const selectedOption = filterableOptions.findBy(valueKey, selected); 
        const selectedIndex = filterableOptions.indexOf(selectedOption);
        let newOption = selectedOption;
        let newOptionValue = selected;

        if (direction === 'next' && selectedIndex < filterableOptions.length - 1) {
            newOption = filterableOptions[selectedIndex + 1];
        } else if (direction === 'prev' && selectedIndex > 0){
            newOption = filterableOptions[selectedIndex - 1];
        }
        if (isOpen) {
            this.focusAdjacentLi(direction);
        }

        newOptionValue = get(newOption, valueKey);

        this.selectOption(newOptionValue, false)
    },
    focusAdjacentLi(direction) {
        let focusedParent = this.$('.unified-select-dropdown-list a:focus').parent();
        let dropdownItem = this.$('.unified-select-dropdown-list a');
        let newFocus = focusedParent[direction](dropdownItem).children('a');

        this.$(newFocus).focus();
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
            if (get(this, 'media.isDesktop') && this.$('.unified-select-dropdown-list a.filtered').length > 0) {
                this.$('.unified-select-dropdown-list a.filtered')[0].focus();
            }
        });
    },
    clearFilter() {
        set(this, 'queryString', '');
        get(this, 'filterableOptions').setEach('filtered', true);
    },

    keyDown(event) {
        const key = event.key;
        if (key && !get(this, 'nativeSelect')) {
            switch (key) {
                case "Tab":
                    this.closeDropdown(false);
                    break;
                case "Enter":
                    this.toggleDropdown();
                    break;
                case "Shift":
                    break;
                case "Escape":
                    break;
                case " "://Space
                    this.toggleDropdown();
                    event.preventDefault();
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    this.selectAdjacentOption('prev');
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    this.selectAdjacentOption('next');
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
            this.selectOption(option);
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
