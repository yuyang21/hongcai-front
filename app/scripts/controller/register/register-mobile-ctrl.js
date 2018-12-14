'use strict';
angular.module('hongcaiApp')
  .controller('RegisterMobileCtrl', function($scope, $state, $rootScope, $stateParams, checkPwdUtil, RegisterService, SessionService, DEFAULT_DOMAIN, toaster, md5, ipCookie, MainService, UserCenterService) {
    $rootScope.pageTitle = '手机注册' + ' - 宏财网';
    $scope.userbusiness = 0;
    $scope.strength = 1
    $scope.errMsg = ''
    var parttern = /^(?=.*[a-zA-Z])(?=.*[0-9])[\da-zA-Z~!@#$%^&*]{6,22}$/
    /**
     * 注册链接上是否有邀请码
     */
    if ($stateParams.inviteCode) {
      $scope.user = {
        inviteCode: $stateParams.inviteCode
      };
    }

    if(ipCookie('registeInviteCode')){
      var cookiesInviteCode = ipCookie('registeInviteCode');
      $scope.user = {
        inviteCode: cookiesInviteCode
      };
    }

    $scope.submitRegisterMobile = function(user) {
      RegisterService.saveRegister.save({
        type: 0,
        picCaptcha: user.picCaptcha,
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
        } else {
          toaster.pop('warning', '提示', response.msg);
          $state.go('root.register');
        }
      });
    };



    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?';
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };
    // 密码强度校验
    $scope.$watch('user.password', function (newVal, oldVal) {
      $scope.errMsg = ''
      if (!parttern.test(newVal)) {
        $scope.errMsg = '长度6-22，数字或字母的组合，可以包含特殊字符~!@#$%^&*'
      }
      if (newVal && newVal.length > 21) {
        $scope.user.password = newVal.substr(0, 21);
      }
      $scope.strength = checkPwdUtil.getStrength(newVal, oldVal)
    })

    /**
      * 校验图形验证码只能输入数字
      */
    $scope.$watch('user.picCaptcha', function (newVal, oldVal) {
      var captchaPattern = /^\d{1,4}$/
      if (newVal && !captchaPattern.test(newVal)) {
        $scope.user.picCaptcha = newVal.replace(/\D/g, '').toString().slice(0, 4)
      }
    })

    /**
     * 处理推广流量
     * @type {[type]}
     */
    var from = $stateParams.from;
    if (from) {
      ipCookie('utm_from', from, {
        expires: 1
      });
      MainService.trafficStats.get({
        from: from
      });
    }
  });
