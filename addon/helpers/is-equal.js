import Ember from 'ember';

export const isEqual = ([left, right]) => left === right;

export default Ember.Helper.helper(isEqual);