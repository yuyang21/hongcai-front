'use strict';
angular.module('hongcaiApp').directive('checkMobileCaptcha', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(attrs.ngModel, function() {
        var mobileNum = angular.element('#mobileNum').val();
        var captcha = angular.element('#' + attrs.checkMobileCaptcha).val();
        if(mobileNum && captcha){
          $http({
            method: 'POST',
            url: DEFAULT_DOMAIN + '/siteUser/checkMobileCaptcha?mobile=' + mobileNum + '&' + 'captcha=' + captcha
            // url: DEFAULT_DOMAIN + '/siteUser/checkMobileCaptcha?mobile=' + angular.element('#' + attrs.checkMobileCaptcha).val() + '&' + 'captcha=' +
          }).success(function(data) {
            if(data.ret === 1) {
              ctrl.$setValidity('check', true);
            } else {
              ctrl.$setValidity('check', false);
            }
          }).error(function() {
            ctrl.$setValidity('check', false);
          });
          }
      });
    }
  };
}]);
