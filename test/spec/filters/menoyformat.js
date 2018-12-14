'use strict';

describe('Filter: menoyFormat', function () {

  // load the filter's module
  beforeEach(module('p2pSiteWebApp'));

  // initialize a new instance of the filter before each test
  var menoyFormat;
  beforeEach(inject(function ($filter) {
    menoyFormat = $filter('menoyFormat');
  }));

  it('should return the input prefixed with "menoyFormat filter:"', function () {
    var text = 'angularjs';
    expect(menoyFormat(text)).toBe('menoyFormat filter: ' + text);
  });

});
