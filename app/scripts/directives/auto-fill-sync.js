'use strict';

/**
 * @ngdoc directive
 * @name hongcaiApp.directive:autoFillSync
 * @description
 * # autoFillSync
 * 解决浏览器autofill自动填充密码ngSubmit无法自动登录。
 */
angular.module('hongcaiApp')
  .directive('autoFillSync', function ($timeout) {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ngModel) {
        var origVal = elem.val();
        $timeout(function () {
          var newVal = elem.val();
          if(ngModel.$pristine && origVal !== newVal) {
            ngModel.$setViewValue(newVal);
          }
        }, 500);
      }
    };
  });
