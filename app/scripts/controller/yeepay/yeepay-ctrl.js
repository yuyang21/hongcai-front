'use strict';
angular.module('hongcaiApp')
  .controller('YeepayCtrl', ['$scope', '$state', '$rootScope', '$stateParams', function($scope, $state, $rootScope, $stateParams) {
    $scope.yeepayServiceName = $stateParams.yeepayService;
    $scope.yeepayCallBackStatus = $stateParams.yeepayStatus;
  }]);
