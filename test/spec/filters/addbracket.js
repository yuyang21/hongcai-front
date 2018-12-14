'use strict';

describe('Filter: addbracket', function () {

  // load the filter's module
  beforeEach(module('p2pSiteWebApp'));

  // initialize a new instance of the filter before each test
  var addbracket;
  beforeEach(inject(function ($filter) {
    addbracket = $filter('addbracket');
  }));

  it('should return the input prefixed with "addbracket filter:"', function () {
    var text = 'angularjs';
    expect(addbracket(text)).toBe('addbracket filter: ' + text);
  });

});
