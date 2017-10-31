import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click, keyEvent, fillIn, find, findAll, waitUntil } from 'ember-native-dom-helpers';

describe('Integration | Component | select box', function () {
    setupComponentTest('select-box', {
        integration: true
    });
    it('renders', function () {
        this.render(hbs `{{select-box}}`);
        assert.isOk(find('.select-box'));
    });
    it('renders a native select box', function () {
        this.render(hbs `{{select-box nativeSelect=true}}`);
        assert.isOk(find('select'));
    });
    it('renders a custom select box', function () {
        this.render(hbs `{{select-box}}`);
        assert.isOk(find('.select-box__dropdown'));
    });
    it('handles custom deep options and filterable options', function () {
        this.set('displayKey', 'display');
        this.set('valueKey', 'value');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}]);
        this.render(hbs `{{select-box options=options displayKey=displayKey valueKey=valueKey}}`);
        expect(findAll('[data-test-id^="sbDeepOption"]')).to.have.lengthOf(4);
    });
    it('handles native deep options', function () {
        this.set('displayKey', 'display');
        this.set('valueKey', 'value');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}]);
        this.render(hbs `{{select-box selectId="sbNativeDeep" options=options displayKey=displayKey valueKey=valueKey nativeSelect=true}}`);
        expect(findAll('#sbNativeDeep option')).to.have.lengthOf(4);
    });
    it('handles custom flat options and filterable options', function () {
        this.set('options', ['1', '2', '3', '4']);
        this.render(hbs `{{select-box options=options}}`);
        expect(findAll('[data-test-id^="sbFlatOption"]')).to.have.lengthOf(4);
    });
    it('handles native flat options', function () {
        this.set('options', ['1', '2', '3', '4']);
        this.render(hbs `{{select-box selectId="sbNativeFlat" options=options nativeSelect=true}}`);
        expect(findAll('#sbNativeFlat option')).to.have.lengthOf(4);
    });
    it('displays correct selected value for custom deep options', function () {
        this.set('displayKey', 'display');
        this.set('valueKey', 'value');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}]);
        this.set('selected', '3');
        this.render(hbs `{{select-box options=options selected=selected valueKey=valueKey displayKey=displayKey }}`);
        expect(find('.select-box__dropdown').value).to.eq('third');
    }); 
    it('displays correct selected value for custom flat options', function () {
        this.set('options', ['1', '2', '3', '4']);
        this.set('selected', '3');
        this.render(hbs `{{select-box options=options selected=selected}}`);
        expect(find('.select-box__dropdown').value).to.eq('3');
    });
    it('binds correct selected value for native deep options', function () {
        this.set('displayKey', 'display');
        this.set('valueKey', 'value');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}]);
        this.set('selected', '3');
        this.render(hbs `{{select-box selectId="sbNativeDeep" options=options selected=selected valueKey=valueKey displayKey=displayKey nativeSelect=true}}`);
        expect(find('#sbNativeDeep').value).to.eq('3');
        expect(this.$('#sbNativeDeep option:selected').text().trim()).to.eq('third');
    }); 
    it('binds correct selected value for native flat options', function () {
        this.set('options', ['1', '2', '3', '4']);
        this.set('selected', '3');
        this.render(hbs `{{select-box selectId="sbNativeFlat" options=options selected=selected nativeSelect=true}}`);
        expect(find('#sbNativeFlat').value).to.eq('3');
    });
    it('clears query string on click of close icon', function () {
        this.set('media', {isDesktop: false});
        this.set('label', 'Label');
        this.set('dropdownOpen', true);
        this.set('showMobileSearch', true);
        this.set('valueKey', 'value');
        this.set('displayKey', 'display');
        this.set('queryString', 'thi');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}, {value:'5', display: 'fifth'}, {value:'6', display: 'sixth'}, {value:'7', display: 'seventh'}, {value:'8', display: 'eighth'}, {value:'9', display: 'ninth'}, {value:'10', display: 'tenth'}, {value:'11', display: 'eleventh'}]);
        this.render(hbs `
            {{select-box 
                options=options 
                valueKey=valueKey 
                displayKey=displayKey
                queryString=queryString
                media=media 
                label=label 
                dropdownOpen=dropdownOpen 
                showMobileSearch=showMobileSearch}}`
            );
        keyEvent('.select-box__dropdown-header input', 'keydown', 116);
        click('.icon-close');
        expect(find('.select-box__dropdown-header input').value).to.have.lengthOf(0);
    });
    it('shows filter input on click of search icon', function () {
        this.set('media', {isDesktop: false});
        this.set('label', 'Label');
        this.set('dropdownOpen', true);
        this.set('valueKey', 'value');
        this.set('displayKey', 'display');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}, {value:'5', display: 'fifth'}, {value:'6', display: 'sixth'}, {value:'7', display: 'seventh'}, {value:'8', display: 'eighth'}, {value:'9', display: 'ninth'}, {value:'10', display: 'tenth'}, {value:'11', display: 'eleventh'}]);
        this.render(hbs `
            {{select-box 
                options=options 
                valueKey=valueKey 
                displayKey=displayKey
                media=media 
                label=label 
                dropdownOpen=dropdownOpen }}`
            );
        click('.icon-search');
        assert.isOk(find('.select-box__dropdown-header input'));
    });
    it('shows empty state with invalid filter query', function () {
        this.set('media', {isDesktop: false});
        this.set('label', 'Label');
        this.set('dropdownOpen', true);
        this.set('showMobileSearch', true);
        this.set('valueKey', 'value');
        this.set('displayKey', 'display');
        this.set('queryString', 'thi');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}, {value:'5', display: 'fifth'}, {value:'6', display: 'sixth'}, {value:'7', display: 'seventh'}, {value:'8', display: 'eighth'}, {value:'9', display: 'ninth'}, {value:'10', display: 'tenth'}, {value:'11', display: 'eleventh'}]);
        this.render(hbs `
            {{select-box 
                options=options 
                valueKey=valueKey 
                displayKey=displayKey
                queryString=queryString
                media=media 
                label=label 
                dropdownOpen=dropdownOpen 
                showMobileSearch=showMobileSearch}}`
            );
        assert.isNotOk(find('.select-box__dropdown-empty'));
        fillIn('.select-box__dropdown-header input', 'thiz');
        return waitUntil(() => keyEvent('.select-box__dropdown-header input', 'keydown', 'z'))
            .then(() => {
                assert.isOk(find('.select-box__dropdown-empty'));
            });
    });
    it('filters deep options on mobile', function () {
        this.set('media', {isDesktop: false});
        this.set('label', 'Label');
        this.set('dropdownOpen', true);
        this.set('showMobileSearch', true);
        this.set('valueKey', 'value');
        this.set('displayKey', 'display');
        this.set('queryString', 'thi');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}, {value:'5', display: 'fifth'}, {value:'6', display: 'sixth'}, {value:'7', display: 'seventh'}, {value:'8', display: 'eighth'}, {value:'9', display: 'ninth'}, {value:'10', display: 'tenth'}, {value:'11', display: 'eleventh'}]);
        this.render(hbs `
            {{select-box 
                options=options 
                valueKey=valueKey 
                displayKey=displayKey
                queryString=queryString
                media=media 
                label=label 
                dropdownOpen=dropdownOpen 
                showMobileSearch=showMobileSearch}}`
            );
        fillIn('.select-box__dropdown-header input', 'thir');
        return waitUntil(() => keyEvent('.select-box__dropdown-header input', 'keydown', 'r'))
            .then(() => {
                expect(this.$('[data-test-id^="sbDeepOption"] a.filtered')).to.have.lengthOf(1);
            });
    });
    it('filters deep options on desktop', function () {
        this.set('valueKey', 'value');
        this.set('displayKey', 'display');
        this.set('queryString', 'thi');
        this.set('options', [{value:'1', display: 'first'}, {value:'2', display: 'second'}, {value:'3', display: 'third'}, {value:'4', display: 'fourth'}, {value:'5', display: 'fifth'}, {value:'6', display: 'sixth'}, {value:'7', display: 'seventh'}, {value:'8', display: 'eighth'}, {value:'9', display: 'ninth'}, {value:'10', display: 'tenth'}, {value:'11', display: 'eleventh'}]);
        this.render(hbs `
            {{select-box 
                options=options 
                valueKey=valueKey 
                displayKey=displayKey
                queryString=queryString
                dropdownOpen=dropdownOpen }}`
            );
        return waitUntil(() => keyEvent('.select-box', 'keydown', 'r'))
            .then(() => {
                expect(findAll('[data-test-id^="sbDeepOption"] a.filtered')).to.have.lengthOf(1);
            });
    });
});