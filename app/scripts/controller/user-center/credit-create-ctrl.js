'use strict';
angular.module('hongcaiApp')
  .controller('CreditCreateCtrl', ['$location', '$scope', '$http', '$rootScope', '$state', '$stateParams', 'UserCenterService', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService) {
    // 第一步
    $scope.creditStepFlag = 1;
    $scope.Math = window.Math;
    $scope.disabledFlag1 = $scope.disabledFlag2 = $scope.disabledFlag3 = false;
    // 解决ng-click ng-disabled的生效的问题。
    $scope.$watch('creditStepFlag', function() {
      if ($scope.creditStepFlag === 1) {
        $scope.disabledFlag2 = true;
        $scope.disabledFlag3 = true;
      } else if ($scope.creditStepFlag === 2){
        $scope.disabledFlag3 = true;
      } else {
        $scope.disabledFlag2 = false;
      }
    });

    var number = $stateParams.number; // 债权对应的编号

    /**
     * 获得债权信息，包括订单信息，原项目信息
     */
    $scope.canTransferCreditRight = function(){

    };

    /**
     * 确认挂出债权转让
     */
    $scope.hangTransferCreditRight = function(transferInfo){
      var transferAmount = transferInfo.transferAmount;
      var discountAmount = transferInfo.discountAmount;
      UserCenterService.hangTransferCreditRight.get({
        transferAmount: transferAmount,
        discountAmount: discountAmount,
        creditRightId: $scope.creditRightHolding.creditRight.id
      }, function(response){

        if (response.ret === 1){
          $state.go('root.userCenter.credit');
        }

      });
    };

    // $scope.canTransferCreditRight();


  }]);
