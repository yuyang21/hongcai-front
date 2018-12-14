'use strict';
angular.module('hongcaiApp')
  .controller('AppViewCtrl', ['$scope', '$location', '$window', function($scope, $location, $window) {
    $scope.goInvest = function() {
      $window.location.href = $location.absUrl() + '/Continue to invest';
    };
    $scope.goPersonal = function() {
      $window.location.href = $location.absUrl() + '/Personal Center';
    };
  }]);
