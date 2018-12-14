'use strict';

/**
 * @ngdoc filter
 * @name p2pSiteWebApp.filter:menoyFormat
 * @function
 * @description
 * # menoyFormat
 * Filter in the p2pSiteWebApp.
 */
angular.module('hongcaiApp')
  .filter('menoyFormat', function () {
    return function (input) {
      input = input.toString() || '';
      if(input.length >= 5 ){
        return (input/10000).toString() + '万';
      } else {
        return input;
      }
    };
  });
