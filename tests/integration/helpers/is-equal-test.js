import { assert } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Helpers | is-equal', function () {
  setupComponentTest('helper:is-equal', {
    integration: true
  });

  it('should be true when passed true and true', function() {
    this.render(hbs`{{is-equal true true}}`);

    assert.equal(find('div').innerText.trim(), 'true');
  });

  it('should be false when passed false and true', function() {
    this.render(hbs`{{is-equal false true}}`);

    assert.equal(find('div').innerText.trim(), 'false');
  });

  it('should be false when passed true and false', function() {
    this.render(hbs`{{is-equal true false}}`);

    assert.equal(find('div').innerText.trim(), 'false');
  });

  it('should be true when passed false and false', function() {
    this.render(hbs`{{is-equal false false}}`);

    assert.equal(find('div').innerText.trim(), 'true');
  });

  it('should be true if passed matching strings', function() {
    this.render(hbs`{{is-equal 'foo' 'foo'}}`);

    assert.equal(find('div').innerText.trim(), 'true');
  });

  it('should be false if passed NOT matching strings', function() {
    this.render(hbs`{{is-equal 'foo' 'bar'}}`);

    assert.equal(find('div').innerText.trim(), 'false');
  });

  it('should be true if passed two matching properties', function() {
    this.setProperties({
      left: 'foo',
      right: 'foo',
    });

    this.render(hbs`{{is-equal left right}}`);

    assert.equal(find('div').innerText.trim(), 'true');
  });

  it('should be false if passed two NOT matching properties', function() {
    this.setProperties({
      left: 'foo',
      right: 'bar',
    });

    this.render(hbs`{{is-equal left right}}`);

    assert.equal(find('div').innerText.trim(), 'false');
  });

  it('should switch as computed properties change', function() {
    this.setProperties({
      left: 'foo',
      right: 'bar',
    });

    this.render(hbs`{{is-equal left right}}`);

    assert.equal(find('div').innerText.trim(), 'false');

    this.set('right', 'foo');
    assert.equal(find('div').innerText.trim(), 'true');

    this.set('left', 'bar');
    assert.equal(find('div').innerText.trim(), 'false');
  });


  it('should be true when comparing with the get helper', function() {
    this.setProperties({
      left: 'foo',
      right: { deeper: 'foo', },
    });

    this.render(hbs`{{is-equal left (get right 'deeper')}}`);

    assert.equal(find('div').innerText.trim(), 'true');
  });

  it('should be usable inline to toggle an attribute', function() {
    this.setProperties({
      left: 'foo',
      right: 'bar',
    });

    this.render(hbs`<input disabled={{is-equal left right}} />`);

    assert.equal(find('input').hasAttribute('disabled'), false);

    this.set('right', 'foo');
    assert.equal(find('input').hasAttribute('disabled'), true);
  });
});
