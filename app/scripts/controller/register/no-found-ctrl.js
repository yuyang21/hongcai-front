'use strict';
angular.module('hongcaiApp')
  .controller('NoFoundCtrl', ['$scope', '$timeout', '$state', function ($scope, $timeout, $state) {
    $scope.counter = 3;
    $scope.onTimeout = function() {
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout, 1000);
      if ($scope.counter === 0) {
        $state.go('root.main');
      }
    };
    var mytimeout = $timeout($scope.onTimeout, 1000);
    $scope.$on('$stateChangeStart', function() {
      $timeout.cancel(mytimeout);
    });
  }]);

