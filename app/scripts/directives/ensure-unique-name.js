'use strict';
angular.module('hongcaiApp').directive('ensureUniqueName', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch(attrs.ngModel, function() {
				var name = angular.element('#' + attrs.ensureUniqueName).val();
				if(name !== '') {
					$http({
						method: 'POST',
						url: DEFAULT_DOMAIN + '/siteUser/isUniqueName?name=' + name
					}).success(function(data) {
						if(data.data.isUnique === 0) {
							ctrl.$setValidity('unique', true);
						} else if(data.data.isUnique === 1) {
							ctrl.$setValidity('unique', false);
						}
					}).error(function() {
						ctrl.$setValidity('unique', false);
					});
				}
			});
		}
	};
}]);
