'use strict';
angular.module('hongcaiApp').directive('helpsidebar', ['$location','$rootScope', function($location,$rootScope) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			menus: '='
		},
		link: function postLink(scope, element) {
			scope.$watch(function() {
				return '/'+$location.path().split('/')[1];
			}, function(newValue) {
				angular.element('a[href]', element).each(function(k, a) {
					var $a = angular.element(a),
					pattern = $a.attr('href'),
					regexp = new RegExp('^' + pattern + '$', ['i']);
					if(regexp.test(newValue)) {
						$a.addClass('on-it');
            for (var i = scope.menus.left.length - 1; i >= 0; i--) {
              if(regexp.test(scope.menus.left[i].href)){
                $rootScope.titleName = scope.menus.left[i].text;
              }
            }
					} else {
						$a.removeClass('on-it');
					}

				});
			});
		},
		template: '<div class="col-md-2 col-lg-2 about-left-area">' +
		'<div class="row"><a  class="tips-header" ><p>帮助</p></a><a ng-repeat="m in menus.left" ui-sref="{{m.link}}" href="{{m.href}}" class="tips-area" >' +
		// '<div class="left-show-area"></div>' +
		'<p>{{m.text}}</p>' +
		'</a></div></div>'
	};
}]);
