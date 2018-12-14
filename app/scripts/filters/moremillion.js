'use strict';
angular.module('hongcaiApp')
  .filter('moreMillion', function () {
    return function (input, len) {
      input = String(input);
      if(input.split('.')[0].length >= len){
        return parseInt(input);
      } else {
        return Number(input).toFixed(2);
      }
    };
  });
