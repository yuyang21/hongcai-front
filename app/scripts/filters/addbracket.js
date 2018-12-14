'use strict';

/**
 * @ngdoc filter
 * @name hongcaiApp.filter:addDracket
 * @function
 * @description
 * # addbracket
 * Filter in the hongcaiApp.
 */
angular.module('hongcaiApp')
  .filter('addDracket', function () {
    return function (input) {
      return '(' + input + ')';
    };
  });
