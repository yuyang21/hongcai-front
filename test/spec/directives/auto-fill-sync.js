'use strict';

describe('Directive: autoFillSync', function () {

  // load the directive's module
  beforeEach(module('p2pSiteWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<auto-fill-sync></auto-fill-sync>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the autoFillSync directive');
  }));
});
