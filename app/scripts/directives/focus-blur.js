/*
 * @Author: fuqiang1
 * @Date:   2016-09-13 10:28:24
 * @Last Modified by:   fuqiang1
 * @Last Modified time: 2016-09-13 10:38:15
 */

'use strict';
angular.module('hongcaiApp').directive('focusBlur', [function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      if(element) {
        element.bind('click', function(event) {
          event.preventDefault();
          element.next().fadeIn();
        }).bind('blur', function() {
          element.next().fadeOut();
        });
      }
    }
  };
}]);
