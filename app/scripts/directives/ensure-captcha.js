'use strict';
angular.module('hongcaiApp').directive('ensureCaptcha', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch(attrs.ngModel, function() {
				var captcha = angular.element('#' + attrs.ensureCaptcha).val();
				if(!captcha || captcha.length !== 4 ){
					ctrl.$setValidity('check', false);
          scope.piccha = false;
					return;
				}

				$http({
					method: 'POST',
					url: DEFAULT_DOMAIN + '/siteUser/checkPicCaptcha?captcha=' + captcha
				}).success(function(data) {
					if(data.ret === 1) {
						ctrl.$setValidity('check', true);
            scope.piccha = true;
					} else {
						ctrl.$setValidity('check', false);
            scope.piccha = false;
					}
				}).error(function() {
					ctrl.$setValidity('check', false);
          scope.piccha = false;
				});
			});
		}
	};
}]);
