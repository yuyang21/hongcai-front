'use strict';
angular.module('hongcaiApp')
  .controller('RechargeTransferCtrl',
    function ($scope, $state, $rootScope, toaster, $stateParams, UserCenterService, config, PayUtils) {
    var business = $stateParams.business;


    if(business == 'ACTIVE'){
      UserCenterService.cgtActive.active({}, function(response){
        if (response && response.ret !== -1) {
          PayUtils.redToTrusteeship('toActive', response);
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    }
    else {
      UserCenterService.recharge.post({
        amount: $stateParams.amount,
        rechargeWay: $stateParams.rechargeWay,
        expectPayCompany: $stateParams.expectPayCompany
      }, function(response) {
        if (response && response.ret !== -1) {
          PayUtils.redToTrusteeship('toRecharge', response);
        } else {
          // TODO alert是更好的方式，暂且用toaster
          // $scope.msg = response.msg;
          // var alertDialog = $alert({scope: $scope, template: 'views/modal/alert-dialog.html', show: true});
          toaster.pop('warning', response.msg);
          // $state.go('root.userCenter.security-settings');
          // $rootScope.openTrusteeshipAccount = true;
        }
      });
    }

  });
