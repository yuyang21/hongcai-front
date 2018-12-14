'use strict';
angular.module('hongcaiApp')
  .controller('InviteLandingCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, ngClipboard, $aside, $window, $modal, config, toaster, VouchersService) {
    /**
     * 判断是否开通第三方托管账户
     */
    VouchersService.getInviteList.get(function(response) {
      if (response.ret === 1) {
        $scope.voucher = response.data.voucher;
        $scope.inviteCode = response.data.voucher.inviteCode;
      } else {
        //console.log('ask invite-rebate, why getInviteList did not load data...');
      }
    });

    $scope.showModalFlag = false;


    $scope.showModal = function(){

      if(!$rootScope.isLogged){
        $modal({
              scope: $rootScope,
              template: 'views/modal/modal-toLogin.html',
              show: true
        });
        return;
      }

      $('#myModal1').modal()
    }

    /**
     * 复制邀请链接
     */
    $scope.copyInviteUrl = function(){
      ngClipboard.toClipboard('http://www.hongcai.com/register?inviteCode=' + $scope.inviteCode);
      toaster.pop('success', '复制成功！');
    }
  });
