'use strict';

/**
 * @ngdoc directive
 * @name p2pSiteWebApp.directive:fancybox
 * @description
 * # fancybox
 */
angular.module('hongcaiApp')
  .directive('fancybox', function ($compile) {
    return {
      /*restrict: 'A',
      link: function(scope, element) {
        element.bind('click', function () {
          
          angular.element('a.grouped_elements').fancybox();
        });
      }*/

      restrict: 'A',
      replace: false,
      link: function($scope, element) {

        $scope.openFancybox = function() {
          
          var el = angular.element(element.html()),

          compiled = $compile(el);
          
          angular.element.fancybox.open(el);

          compiled($scope);
       
        };
      }
    };
  });
