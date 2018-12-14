'use strict';

/**
 * @ngdoc directive
 * @name hongcaiApp.directive:ieSelectFix
 * @description
 * # ieSelectFix
 */
angular.module('hongcaiApp')
  .directive('ieSelectFix', ['$document', function($document) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attributes) {
        var isIE = $document[0] && $document[0].attachEvent;
        if (!isIE) {
          return;
        }
        var control = element[0];
        scope.$watch(attributes.ieSelectFix, function() {
          setTimeout(function() {
            var option = document.createElement('option');
            control.add(option,null);
            control.remove(control.options.length-1);
          }, 0);
        });
      }
    };
  }
]);
