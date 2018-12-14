'use strict';
angular.module('hongcaiApp')
  .controller('InvestVerifyTransferCtrl', function ($rootScope, $scope, toaster, $stateParams, OrderService, PayUtils) {

    OrderService.transfer.get({
      projectId: $stateParams.projectId,
      orderId: $stateParams.orderId
    }, function(response) {
      if (response && response.ret !== -1) {
        PayUtils.redToTrusteeship('toTransfer', response);
      } else {
        toaster.pop('error', response.msg);
      }
    });

  });