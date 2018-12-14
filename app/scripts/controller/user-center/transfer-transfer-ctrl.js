'use strict';
angular.module('hongcaiApp')
  .controller('TransferTransferCtrl',  function ($scope, $state, $rootScope, toaster, $stateParams, UserCenterService, config) {

    toaster.pop('error', "不再支持的操作！");

    // UserCenterService.transferToPlatform.get({
    //   transferAmount: $stateParams.transferAmount
    // }, function(response) {
    //   if (response.ret === 1) {
    //     var req = response.data.req;
    //     var sign = response.data.sign;
    //     var _f = newForm();
    //     createElements(_f, 'req', req);
    //     createElements(_f, 'sign', sign);
    //     _f.action = config.YEEPAY_ADDRESS + 'toCpTransaction';
    //     _f.submit();
    //   } else {
    //     // TODO alert是更好的方式，暂且用toaster
    //     // $scope.msg = response.msg;
    //     // var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
    //     toaster.pop('warning', response.msg);
    //     $state.go('root.userCenter.recharge-transfer');
    //     $rootScope.openTrusteeshipAccount = true;
    //   }
    // });

  });
