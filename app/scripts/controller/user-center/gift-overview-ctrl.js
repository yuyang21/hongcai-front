'use strict';
angular.module('hongcaiApp')
  .controller('GiftOverviewCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'UserCenterService', function($scope, $state, $rootScope, $stateParams, UserCenterService) {
    UserCenterService.getGiftListByUserId.get(function(response) {
      if (response.ret === 1) {
        $scope.giftList = response.data.giftList;
        $scope.currentPage = 0;
        $scope.pageSize = 6;
        $scope.data = [];
        $scope.totalAvailable = 0;
        $scope.totalAvailableAmount = 0;
        $scope.totalUsedAmount = 0;

        $scope.numberOfPages = function() {
          return Math.ceil($scope.data.length / $scope.pageSize);
        };
        for (var i = 0; i < $scope.giftList.length; i++) {
          $scope.data.push($scope.giftList[i]);
          if ($scope.giftList[i].gift.status === 2) {
            $scope.totalAvailableAmount += $scope.giftList[i].gift.amount;
            $scope.totalAvailable++;
          }
          if ($scope.giftList[i].gift.status === 3) {
            $scope.totalUsedAmount += $scope.giftList[i].gift.amount;
          }
        }
      } else {
        //console.log('ask gift-overview, why getGiftListByUserId did not load data...');
      }
    });

  }]);
