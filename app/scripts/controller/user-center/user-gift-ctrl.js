'use strict';
angular.module('hongcaiApp')
  .controller('UserGiftCtrl', ['$location', '$scope', '$rootScope', '$state', '$stateParams', 'UserCenterService', function($location, $scope, $rootScope, $state, $stateParams, UserCenterService) {
    $scope.typeInvStatus = {
      '0': '未支付',
      '1': '已支付'
    };
    $scope.status = $stateParams.status || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;

    var getOrderByUser = UserCenterService.getGiftOrderByUser.get({
        type: $stateParams.type,
        dateInterval: $stateParams.dateInterval,
        status: $stateParams.status
      },
      function() {
        if (getOrderByUser.ret === 1) {
          $scope.orderList = getOrderByUser.data.orderProjectList;
          $scope.orderCount = getOrderByUser.data.orderCount;
          $scope.amount = getOrderByUser.data.amount;
          $scope.dateInterval = getOrderByUser.data.dateInterval;
          $scope.status = getOrderByUser.data.status;
          $scope.currentPage = 0;
          $scope.pageSize = 6;
          $scope.data = [];
          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };
          for (var i = 0; i < $scope.orderList.length; i++) {
            $scope.data.push($scope.orderList[i]);
          }
        } else {
          //console.log('ask gift-rebate, why getOrderByUser did not load data...');
        }
      });
  }]);
