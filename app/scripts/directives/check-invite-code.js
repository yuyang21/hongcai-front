/* 检验密码是否正确*/
'use strict';
angular.module('hongcaiApp').directive('checkInviteCode', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, ctrl) {
			scope.$watch(attrs.ngModel, function() {
				var inviteCode = angular.element('#inviteCode').val();
				if(inviteCode !== '') {
					$http({
						method: 'POST',
						url: DEFAULT_DOMAIN + '/activity/checkInviteCode?inviteCode=' + inviteCode
					}).success(function(response) {
						if(response.data.isValid === 1) {
							ctrl.$setValidity('isInviteCodeTrue', true);
						} else if(response.data.isValid	 === 0) {
							ctrl.$setValidity('isInviteCodeTrue', false);
						}
					}).error(function() {
						ctrl.$setValidity('isInviteCodeTrue', false);
					});
				} else{
					ctrl.$setValidity('isInviteCodeTrue', true);
				}
			});
		}
	};
}]);
