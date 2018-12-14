/*
* @Author: yuyang
* @Date:   2016-09-26 17:22:58
* @Last Modified by:   yuyang
* @Last Modified time: 2016-09-26 17:37:34
*/

'use strict';
angular.module('hongcaiApp')
  .controller('newInviteCtrl', function(toaster, $location, $scope, $rootScope, $state, VouchersService){
    $scope.toEarnMoney = function(){
      if($rootScope.isLogged){
        $state.go('root.userCenter.invite-rebate');
      }else {
        $state.go('root.login', {'redirectUrl': $location.path()});
      }
    }

    // 市场 新年邀请活动
    $scope.goInvite = function(){
      if($rootScope.isLogged){
        $scope.isModal = true;
        $('#invite').attr({'data-toggle':'modal', 'data-target':'#myModal'});
      }else {
        toaster.pop('warning', '对不起，您还未登录，请先登录');
        // $rootScope.tologin();
        $state.go('root.login', {'redirectUrl': $location.path()});
      }
    }
    VouchersService.getInviteList.get(function(response) {
      if (response.ret === 1) {
        $scope.inviteCode = response.data.voucher.inviteCode;

        // 生成自己的二维码
		$('#qrcode').qrcode({
		  render:'table',
		  text:'http://m.hongcai.com/register?inviteCode=' + $scope.inviteCode,
		  size: 150
		});
      }else {

      }
    })

  })
