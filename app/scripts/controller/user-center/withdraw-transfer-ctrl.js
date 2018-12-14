'use strict';
angular.module('hongcaiApp')
  .controller('WithdrawTransferCtrl', function ($scope, toaster, $stateParams, UserCenterService, $alert, PayUtils) {
  

    UserCenterService.withdraw.post({
      amount: $stateParams.amount,
      captcha: $stateParams.captcha
    }, function(response) {
      if (response && response.ret !== -1) {
        PayUtils.redToTrusteeship('toWithdraw', response);
      } else if (response.ret === -1) {
        $scope.msg = response.msg;
        $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
      } else {
        //console.log('ask withdraw, why yeepayWithdraw did not load data...');
      }
    });
    
  });