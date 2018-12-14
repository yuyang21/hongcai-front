'use strict';
angular.module('hongcaiApp')
  .controller('InvPlanVerifyTransferCtrl', function($rootScope, $scope, toaster, $stateParams, OrderService, PayUtils) {

    OrderService.saveFundsOrder.get({
      projectId: $stateParams.projectId,
      amount: $stateParams.amount,
      isRepeat: $stateParams.isRepeat,
      payAmount: $stateParams.payAmount,
      couponNumber: $stateParams.couponNumber
    }, function(response) {
      if (response.ret === 1) {
        var orderId = response.data.orderId;
        // var isRepeat = response.data.isRepeat;
        OrderService.transferFunds.get({
          projectId: $stateParams.projectId,
          orderId: orderId/*,
          isRepeat: isRepeat*/
        }, function(response) {
          if (response && response.ret !== -1) {
            PayUtils.redToTrusteeship('toTransfer', response);
          } else {
            toaster.pop('error', response.msg);
          }
        });
      } else {
        toaster.pop('error', response.msg);
      }
    });
  });
