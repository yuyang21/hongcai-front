'use strict';
angular.module('hongcaiApp').directive('disclosuresidebar', ['$location', '$rootScope', function($location, $rootScope) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			menus: '='
		},
		link: function postLink(scope, element) {
			scope.$watch(function() {
				return $location.path();
				// return $location.path();
			}, function(newValue) {
        // $('a[href]', element).each(function(k, a) {
				angular.element('a[href]', element).each(function(k, a) {
					var $a = angular.element(a),
					pattern = $a.attr('href'),
					regexp = new RegExp('^' + pattern + '+', ['i']);
					if(regexp.test(newValue)) {
						k == 7 || k == 6 ? angular.element(angular.element('.tips-area')[5]).addClass('dison-it') : null
						$a.addClass('dison-it');
						for (var i = scope.menus.left.length - 1; i >= 0; i--) {
							if(regexp.test(scope.menus.left[i].href)){
								$rootScope.titleName = scope.menus.left[i].text;
							}
						}
						//console.log($(this).context.text);
						//$rootScope.title=$(this).context.text
					} else {
						$a.removeClass('dison-it');
					}

				});
			});
		},
		template:'<div class="col-md-2 col-lg-2 about-left-area">' +
		'<div class="row"><a  class="disclosure-header" ><p>信息披露</p></a><a ng-repeat="m in menus.left" ui-sref="{{m.link}}" href="{{m.href}}" class="tips-area" >' +
		/*'<div class="left-show-area"></div>' +*/
		'<p class="text-center padding-l-0" ng-class="{margin: $index == 0 }">{{m.text}}</p>' +
		'</a></div></div>'
	};
}]);
