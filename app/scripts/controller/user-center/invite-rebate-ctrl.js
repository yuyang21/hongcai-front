'use strict';
angular.module('hongcaiApp')
  .controller('InviteRebateCtrl', function($scope, $state, $rootScope, UserCenterService, $alert, ShareUtils, VouchersService, ngClipboard, toaster, config) {
    // $scope.pageSize = 5;
    $scope.pageSize = 6;
    // $scope.currentPage = 1;
    $scope.invitList = function(page) {
      VouchersService.getInviteList.get({
        page: page,
        pageSize: 6
      },function(response) {
        if (response && response.ret !== -1) {
          $scope.inviteList = response.data;
          $scope.currentPage = page;
          $scope.numberOfPages = function() {
            return Math.ceil(response.total/$scope.pageSize);
          };
        } 
        
      });
    }
    $scope.invitList(1);
    VouchersService.inviteVoucher.get(function(response){
      if(response && response.ret !== -1) {
        $scope.voucher = response;
        $scope.inviteCode = response.inviteCode;
        $scope.copyUrl = 'https://www.hongcai.com/#!/register-mobile/' + $scope.inviteCode;
        $scope.inviteUrl = "http://www.hongcai.com/register?inviteCode=" + $scope.inviteCode;
        // 生成自己的二维码
        $('#qrcode').qrcode({
          render:'table',
          text: config.domain + '/activity/channel?inviteCode=' + $scope.inviteCode,
          size: 150
        });
      }
    })

    VouchersService.inviteStat.get(function(response){
      if (response.ret === 1){
        $scope.inviteStat = response.data.inviteStat;
      }

    });


    $scope.showMessage = function() {
      $scope.msg = '邀请链接已经复制到剪切板，赶快复制（Ctrl+V）给您的好友，一起在宏财出借吧！';
      $alert({
        scope: $scope,
        template: 'views/modal/alert-dialog.html',
        show: true
      });
    };


    /**
     * 复制邀请链接
     */
    $scope.copyInviteUrl = function(){
      ngClipboard.toClipboard('http://www.hongcai.com/register?inviteCode=' + $scope.inviteCode);
      toaster.pop('success', '复制成功！');
    }
    /**
     * 分享到微博
     */
    $scope.shareWeibo = function(){

      var shareLink = config.domain + "/register?inviteCode=" + $scope.inviteCode;
      ShareUtils.toWeibo('点击注册，得68888体验金 ' + shareLink);


    }


    /**
     * 分享到qqzone
     */
    $scope.shareQQ = function(){
      var shareLink = config.domain + "/register?inviteCode=" + $scope.inviteCode;
      var desc = "点击注册，得8888体验金" + shareLink;

      ShareUtils.toQQzone('点击注册，得8888体验金', shareLink, desc);

    }

    $scope.wechatQrCode = config.en ==='online' ?  '/images/user-center/wechat.png' : '/images/user-center/wechat-test.png'

  });
