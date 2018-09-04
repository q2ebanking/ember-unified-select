import Ember from 'ember';
import clickElsewhere from '../mixins/click-elsewhere';

const {
    assert,
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
    guidFor,
    run: {
        debounce,
        next,
    },
    Component,
} = Ember;

export default Component.extend(clickElsewhere, {
    classNames: ['unified-select'],
    options: [],
    disabled: null,
    nativeSelect: false,
    placeholder: '',
    selected: '',
    dropdownOpen: false,
    selectId: '',
    valueKey: 'name',
    displayKey: 'name',
    onchange: null,
    isDeepOptions: computed('options', 'displayKey', 'valueKey', function () {
        const display = get(this, `options.0.${get(this, 'displayKey')}`);
        const value = get(this, `options.0.${get(this, 'valueKey')}`);
        return !(display === undefined && value === undefined);
    }),
    selectedDisplay: computed('selected', 'filterableOptions', 'valueKey', 'displayKey', 'isDeepOptions', function () {
        const isDeepOptions = get(this, 'isDeepOptions');
        const filterableOptions = get(this, 'filterableOptions');
        const valueKey = get(this, 'valueKey');
        const displayKey = get(this, 'displayKey');
        let selected = get(this, 'selected');

        if (isDeepOptions) {
            let selectedDeepOption = filterableOptions.findBy(valueKey, selected);

            selected = selectedDeepOption ? get(selectedDeepOption, displayKey) : '';
        }

        return selected;
    }),
    emptyOptions: empty('options'),

    showModalSearch: false,
    searchableOptions: gt('options.length', 10),
    queryString: '',
    filterableOptions: map('options', function (option) {
        if (get(this, 'isDeepOptions')) {
            set(option, 'filtered', true);
            return option;
        } else {
            return {
                val: option,
                filtered: true
            };
        }
    }),
    filteredOptions: filterBy('filterableOptions', 'filtered', true),
    noFilteredResults: empty('filteredOptions'),

    showInline: true,
    showAsModal: not('showInline'),
    showModalOverlay: and('dropdownOpen', 'options.length', 'showAsModal'),
    showModalHeader: and('dropdownOpen', 'label', 'showAsModal'),
    showEmptyState: and('noFilteredResults', 'showAsModal'),

    clearLabel: 'Clear Filter',
    filterLabel: 'Filter Options',
    emptyFilterText: 'No options available',

    dropdownId: computed(function () {
        return `unified-select-dropdown-list-${guidFor(this)}`;
    }),
    dropdownClasses: computed('searchableOptions', 'dropdownOpen', 'showAsModal', function () {
        const searchable = get(this, 'searchableOptions') ? ' searchable' : '';
        const open = get(this, 'dropdownOpen') ? ' open' : '';
        const asModal = get(this, 'showAsModal') ? ' as-modal' : '';

        return `unified-select-dropdown-container${searchable}${open}${asModal}`;
    }),

    init() {
        this._super(...arguments);

        const hasOnchangeFn = typeof get(this, 'onchange') === 'function';
        assert('Must define onchange function for ember-unified-select', hasOnchangeFn);
    },

    closeDropdown(retainFocus = true) {
        const wasOpen = get(this, 'dropdownOpen') === true;
        set(this, 'dropdownOpen', false);
        set(this, 'showModalSearch', false);

        if (wasOpen && retainFocus) {
            next(() => this.$('.unified-select-dropdown').focus());
        }
    },
    openDropdown() {
        set(this, 'dropdownOpen', true);
        const selected = this.$('.unified-select-dropdown-list a.selected');
        const firstItem = this.$('.unified-select-dropdown-list li:first-child a');
        const focusTarget = selected.length === 1 ? selected : firstItem;
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
        const value = option[get(this, 'valueKey')] || option;
        const isOpen = get(this, 'dropdownOpen');
        set(this, 'selected', value);
        this.onchange(value);
        if (isOpen && closeOnSelect) {
            this.closeDropdown();
        }
    },
    selectSpecificOption(key) {
        const isOpen = get(this, 'dropdownOpen');
        const isDeepOptions = get(this, 'isDeepOptions');
        const filterableOptions = get(this, 'filterableOptions');
        const valueKey = isDeepOptions ? get(this, 'valueKey') : 'val';
        const selected = get(this, 'selected');

        const selectedOption = filterableOptions.findBy(valueKey, selected);
        const selectedIndex = filterableOptions.indexOf(selectedOption);
        const isAdjacent = key === 'next' || key === 'prev';
        let newOption = selectedOption;
        let newOptionValue = selected;

        if (key === 'first') {
            newOption = filterableOptions[0];
        } else if (key === 'last') {
            newOption = filterableOptions[filterableOptions.length - 1];
        } else if (key === 'next' && selectedIndex < filterableOptions.length - 1) {
            newOption = filterableOptions[selectedIndex + 1];
        } else if (key === 'prev' && selectedIndex > 0) {
            newOption = filterableOptions[selectedIndex - 1];
        }

        if (isAdjacent && isOpen) {
            this.focusAdjacentOption(key);
        }

        newOptionValue = get(newOption, valueKey);

        this.selectOption(newOptionValue, false)
    },
    focusAdjacentOption(direction) {
        const focusedParent = this.$('.unified-select-dropdown-list a:focus').parent();
        const dropdownItem = this.$('.unified-select-dropdown-list a');
        const newFocus = focusedParent[direction](dropdownItem).children('a');

        this.$(newFocus).focus();
    },
    onClickElsewhere() {
        this.closeDropdown();
    },

    filterOptions(key) {
        let queryString = get(this, 'queryString');
        let filterableOptions = get(this, 'filterableOptions');
        if (get(this, 'showInline')) {
            queryString += key;
            set(this, 'queryString', queryString);
        }
        filterableOptions.forEach((option) => {
            const display = get(this, 'isDeepOptions') ? option[get(this, 'displayKey')] : option.val;
            const matchesFilter = display.toLowerCase().includes(queryString.toLowerCase());
            set(option, 'filtered', matchesFilter);
        });
        if (get(this, 'showInline')) {
            const firstFiltered = filterableOptions.find((option) => get(option, 'filtered') === true);
            firstFiltered && this.selectOption(firstFiltered);
            next(() => {
                if (this.$('.unified-select-dropdown-list a.filtered').length > 0) {
                    this.$('.unified-select-dropdown-list a.filtered')[0].focus();
                }
            });
        }
    },
    clearFilter() {
        set(this, 'queryString', '');
        get(this, 'filterableOptions').setEach('filtered', true);
    },

    keyDown(event) {
        const key = event.key
        if (key && !get(this, 'nativeSelect')) {
            switch (key) {
                case 'Tab':
                    get(this, 'showInline') && this.closeDropdown(false);
                    break;
                case 'Enter':
                    this.toggleDropdown();
                    break;
                case 'Shift':
                    break;
                case 'Escape':
                    this.closeDropdown();
                    break;
                case 'Esc': //for IE
                    this.closeDropdown();
                    break;
                case ' ': //Space
                    event.preventDefault();
                    this.toggleDropdown();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.selectSpecificOption('prev');
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    this.selectSpecificOption('next');
                    break;
                case 'Home':
                    event.preventDefault();
                    this.selectSpecificOption('first');
                    break;
                case 'End':
                    event.preventDefault();
                    this.selectSpecificOption('last');
                    break;
                default:
                    next(() => this.filterOptions(key));
                    if (get(this, 'showInline')) {
                        debounce(this, this.clearFilter, 300);
                    } else if (!get(this, 'dropdownOpen')) {
                        this.openDropdown();
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
            this.toggleProperty('showModalSearch');
            next(() => this.$('.unified-select-filter-input') && this.$('.unified-select-filter-input').focus());
        },
        clearQuery() {
            this.clearFilter();
        },
        updateQuery(value) {
            set(this, 'queryString', value);
        },
        refocus() {
            next(() => this.$('.unified-select-dropdown-container') && this.$('.unified-select-dropdown-container').focus());
        }
    }
});
