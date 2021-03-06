import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click, keyEvent, fillIn, find, findAll, waitUntil } from 'ember-native-dom-helpers';

describe('Integration | Component | unified select', function () {
    setupComponentTest('unified-select', {
        integration: true
    });
    it('renders', function () {
        this.render(hbs `{{unified-select}}`);
        assert.isOk(find('.unified-select'));
    });
    it('renders a native select box', function () {
        this.render(hbs `{{unified-select nativeSelect=true}}`);
        assert.isOk(find('select'));
    });
    it('renders a custom select box', function () {
        this.render(hbs `{{unified-select}}`);
        assert.isOk(find('.unified-select-dropdown'));
    });
    it('handles custom deep options and filterable options', function () {
        this.set('displayKey', 'display');
        this.set('valueKey', 'value');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}]);
        this.render(hbs `{{unified-select options=options displayKey=displayKey valueKey=valueKey}}`);
        expect(findAll('[data-test-id^="sbDeepOption"]')).to.have.lengthOf(4);
    });
    it('handles native deep options', function () {
        this.set('displayKey', 'display');
        this.set('valueKey', 'value');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}]);
        this.render(hbs `{{unified-select selectId="sbNativeDeep" options=options displayKey=displayKey valueKey=valueKey nativeSelect=true}}`);
        expect(findAll('#sbNativeDeep option')).to.have.lengthOf(4);
    });
    it('handles custom flat options and filterable options', function () {
        this.set('options', ['1', '2', '3', '4']);
        this.render(hbs `{{unified-select options=options}}`);
        expect(findAll('[data-test-id^="sbFlatOption"]')).to.have.lengthOf(4);
    });
    it('handles native flat options', function () {
        this.set('options', ['1', '2', '3', '4']);
        this.render(hbs `{{unified-select selectId="sbNativeFlat" options=options nativeSelect=true}}`);
        expect(findAll('#sbNativeFlat option')).to.have.lengthOf(4);
    });
    it('displays correct selected value for custom deep options', function () {
        this.set('displayKey', 'display');
        this.set('valueKey', 'value');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}]);
        this.set('selected', '3');
        this.render(hbs `{{unified-select options=options selected=selected valueKey=valueKey displayKey=displayKey }}`);
        expect(find('.unified-select-dropdown').value).to.eq('third');
    }); 
    it('displays correct selected value for custom flat options', function () {
        this.set('options', ['1', '2', '3', '4']);
        this.set('selected', '3');
        this.render(hbs `{{unified-select options=options selected=selected}}`);
        expect(find('.unified-select-dropdown').value).to.eq('3');
    });
    it('binds correct selected value for native deep options', function () {
        this.set('displayKey', 'display');
        this.set('valueKey', 'value');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}]);
        this.set('selected', '3');
        this.render(hbs `{{unified-select selectId="sbNativeDeep" options=options selected=selected valueKey=valueKey displayKey=displayKey nativeSelect=true}}`);
        expect(find('#sbNativeDeep').value).to.eq('3');
        expect(this.$('#sbNativeDeep option:selected').text().trim()).to.eq('third');
    }); 
    it('binds correct selected value for native flat options', function () {
        this.set('options', ['1', '2', '3', '4']);
        this.set('selected', '3');
        this.render(hbs `{{unified-select selectId="sbNativeFlat" options=options selected=selected nativeSelect=true}}`);
        expect(find('#sbNativeFlat').value).to.eq('3');
    });
    it('clears query string on click of close icon', function () {
        this.set('label', 'Label');
        this.set('dropdownOpen', true);
        this.set('showModalSearch', true);
        this.set('valueKey', 'value');
        this.set('displayKey', 'display');
        this.set('queryString', 'thi');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}, {value:'5', display: 'fifth'}, {value:'6', display: 'sixth'}, {value:'7', display: 'seventh'}, {value:'8', display: 'eighth'}, {value:'9', display: 'ninth'}, {value:'10', display: 'tenth'}, {value:'11', display: 'eleventh'}]);
        this.render(hbs `
            {{unified-select 
                options=options 
                valueKey=valueKey 
                displayKey=displayKey
                queryString=queryString
                label=label 
                dropdownOpen=dropdownOpen 
                showInline=false
                showModalSearch=showModalSearch
            }}`
            );
        keyEvent('.unified-select-filter-input', 'keydown', 116);
        click('.unified-select-close-query');
        expect(find('.unified-select-filter-input').value).to.have.lengthOf(0);
    });
    it('shows filter input on click of search icon', function () {
        this.set('label', 'Label');
        this.set('dropdownOpen', true);
        this.set('valueKey', 'value');
        this.set('displayKey', 'display');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}, {value:'5', display: 'fifth'}, {value:'6', display: 'sixth'}, {value:'7', display: 'seventh'}, {value:'8', display: 'eighth'}, {value:'9', display: 'ninth'}, {value:'10', display: 'tenth'}, {value:'11', display: 'eleventh'}]);
        this.render(hbs `
            {{unified-select 
                options=options 
                valueKey=valueKey 
                displayKey=displayKey
                label=label 
                dropdownOpen=dropdownOpen
                showInline=false
            }}`
            );
        click('.unified-select-search-btn');
        assert.isOk(find('.unified-select-dropdown-header input'));
    });
    it('shows empty state with invalid filter query', function () {
        this.set('label', 'Label');
        this.set('dropdownOpen', true);
        this.set('showModalSearch', true);
        this.set('valueKey', 'value');
        this.set('displayKey', 'display');
        this.set('queryString', 'thi');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}, {value:'5', display: 'fifth'}, {value:'6', display: 'sixth'}, {value:'7', display: 'seventh'}, {value:'8', display: 'eighth'}, {value:'9', display: 'ninth'}, {value:'10', display: 'tenth'}, {value:'11', display: 'eleventh'}]);
        this.render(hbs `
            {{unified-select 
                options=options 
                valueKey=valueKey 
                displayKey=displayKey
                queryString=queryString
                label=label 
                dropdownOpen=dropdownOpen 
                showModalSearch=showModalSearch
                showInline=false
            }}`
            );
        assert.isNotOk(find('.unified-select-dropdown-empty'));
        fillIn('.unified-select-dropdown-header input', 'thiz');
        return waitUntil(() => keyEvent('.unified-select-dropdown-header input', 'keydown', 'z'))
            .then(() => {
                assert.isOk(find('.unified-select-dropdown-empty'));
            });
    });
    it('filters deep options on modal', function () {
        this.set('label', 'Label');
        this.set('dropdownOpen', true);
        this.set('showModalSearch', true);
        this.set('valueKey', 'value');
        this.set('displayKey', 'display');
        this.set('queryString', 'thi');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}, {value:'5', display: 'fifth'}, {value:'6', display: 'sixth'}, {value:'7', display: 'seventh'}, {value:'8', display: 'eighth'}, {value:'9', display: 'ninth'}, {value:'10', display: 'tenth'}, {value:'11', display: 'eleventh'}]);
        this.render(hbs `
            {{unified-select 
                options=options 
                valueKey=valueKey 
                displayKey=displayKey
                queryString=queryString
                label=label 
                dropdownOpen=dropdownOpen 
                showModalSearch=showModalSearch
                showInline=false
            }}`
            );
        fillIn('.unified-select-filter-input', 'thir');
        return waitUntil(() => keyEvent('.unified-select-dropdown-header input', 'keydown', 'r'))
            .then(() => {
                expect(this.$('[data-test-id^="sbDeepOption"] a.filtered')).to.have.lengthOf(1);
            });
    });
    //temporarily skipping due to a timing issue.  The debounce clears the filter while waitUntil resolves, undoing the query.
    it.skip('filters deep options inline', function () {
        this.set('valueKey', 'value');
        this.set('displayKey', 'display');
        this.set('queryString', 'thi');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}, {value:'5', display: 'fifth'}, {value:'6', display: 'sixth'}, {value:'7', display: 'seventh'}, {value:'8', display: 'eighth'}, {value:'9', display: 'ninth'}, {value:'10', display: 'tenth'}, {value:'11', display: 'eleventh'}]);
        this.render(hbs `
            {{unified-select 
                options=options 
                valueKey=valueKey 
                displayKey=displayKey
                queryString=queryString
                dropdownOpen=dropdownOpen }}`
            );
        return waitUntil(() => keyEvent('.unified-select', 'keydown', 'r'))
            .then(() => {
                expect(findAll('[data-test-id^="sbDeepOption"] a.filtered')).to.have.lengthOf(1);
            });
    });
});