'use strict';

/**
 * @ngdoc filter
 * @name p2pSiteWebApp.filter:startForm
 * @function
 * @description
 * # startFrom
 * Filter in the p2pSiteWebApp.
 */
angular.module('hongcaiApp')
  .filter('startFrom', function () {
    return function (input, pageStartNo) {
      input = input || [];
      return input.slice(parseInt(pageStartNo));
    };
  });
