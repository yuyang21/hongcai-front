'use strict';
angular.module('hongcaiApp')
  .filter('addPreZero', function () {
    return function (input) {
      input = Number(input);
      if (input < 10) {
        return '0' + String(input);
      } else {
        return input;
      }
    };
  });
