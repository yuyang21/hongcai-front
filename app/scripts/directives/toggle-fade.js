/*
* @Author: fuqiang1
* @Date:   2016-09-13 09:57:50
* @Last Modified by:   fuqiang1
* @Last Modified time: 2016-09-13 14:54:00
*/

'use strict';
angular.module('hongcaiApp').directive('toggleFade', [function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      element.hover(function() {
        element.next().stop().fadeIn();
      }).mouseleave(function() {
          element.next().stop().fadeOut();
      })
    }
  };
}]);
