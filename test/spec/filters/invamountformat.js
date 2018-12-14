'use strict';

describe('Filter: invAmountFormat', function () {

  // load the filter's module
  beforeEach(module('p2pSiteWebApp'));

  // initialize a new instance of the filter before each test
  var invAmountFormat;
  beforeEach(inject(function ($filter) {
    invAmountFormat = $filter('invAmountFormat');
  }));

  it('should return the input prefixed with "invAmountFormat filter:"', function () {
    var text = 'angularjs';
    expect(invAmountFormat(text)).toBe('invAmountFormat filter: ' + text);
  });

});
