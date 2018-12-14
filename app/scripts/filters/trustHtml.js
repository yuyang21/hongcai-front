'use strict';
/**
 * @ngdoc filter
 * @name hongcaiApp.filter:trustHtml
 * @function
 * @description
 * # trustHtml
 * Filter in the hongcaiApp.
 */
angular.module('hongcaiApp')
  .filter('trustHtml', function ($sce) {
    return function (input) {
      return $sce.trustAsHtml(input);
    };
  });
