'use strict';
angular.module('hongcaiApp')
  .controller('RegisterMobileSanGuoCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'RegisterService', 'SessionService', 'DEFAULT_DOMAIN', 'toaster', 'md5', 'ipCookie', 'MainService', function($scope, $state, $rootScope, $stateParams, RegisterService, SessionService, DEFAULT_DOMAIN, toaster, md5, ipCookie, MainService) {

    /**
     * 注册链接上是否有邀请码
     */
    // if ($stateParams.inviteCode){
    //     $scope.user= {inviteCode:  $stateParams.inviteCode};
    // }

    $scope.submitRegisterMobile = function(user) {
      RegisterService.saveRegister.save({
        name: user.name,
        type: 0,
        account: user.mobile,
        captcha: user.mobileCaptcha,
        password: md5.createHash(user.password),
        inviteCode: user.inviteCode,
        from: ipCookie('utm_from'),
        act: ipCookie('act'),
        guestId: ipCookie('guestId')
      }, function(response) {
        if (response.ret === 1) {
          SessionService.set('user', response.data.user.name);
          $state.go('root.register-mobile-success');
          //$rootScope.loginName = response.data.user.name;
          //$rootScope.isLogged = true;
        } else {
          toaster.pop('warning', '提示', response.msg);
          $state.go('root.registerMobile-sanGuo');
        }
      });
    };

    $scope.sendMobileCaptcha = function() {
      RegisterService.sendMobileCaptcha.save({
        mobile: angular.element('#mobile').val(),
        guestId: ipCookie('guestId')
      }, function(response) {
        if (response.ret === 1) {

        } else {

        }
      });
    };

    /**
     * 处理推广流量统计
     */
    if ($rootScope.channelCode) {
      MainService.trafficStats.get({
        from: $rootScope.channelCode
      });
    }
  }]);
