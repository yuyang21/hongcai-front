'use strict';
/**
 * @ngdoc filter
 * @name hongcaiApp.filter:invAmountFormat
 * @function
 * @description
 * # invAmountFormat
 * Filter in the hongcaiApp.
 */
angular.module('hongcaiApp')
  .filter('invAmountFormat', function () {
    return function (input) {
      return parseInt(input/10000)*10000;
    };
  });
