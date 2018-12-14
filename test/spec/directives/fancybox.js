'use strict';

describe('Directive: fancybox', function () {

  // load the directive's module
  beforeEach(module('p2pSiteWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fancybox></fancybox>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fancybox directive');
  }));
});
