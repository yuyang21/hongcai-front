'use strict';
angular.module('hongcaiApp').directive('findAccount', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch(attrs.ngModel, function() {
				var account = angular.element('#' + attrs.findAccount).val();
				if(account !== '') {
					$http({
						method: 'POST',
						url: DEFAULT_DOMAIN + '/siteUser/findAccount?account=' + account
					}).success(function(data) {
						if(data.data.user) {
							// console.log(data.data.user);
							scope.usermessage =  data.data.user;
							scope.usermobile = data.data.mobile;
							ctrl.$setValidity('unique', true);
						} else if(!data.data.user) {
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
