'use strict';
angular.module('hongcaiApp')
  .controller('LoadPageCtrl',function($scope, $location, $state, $rootScope, $stateParams, LoginService, RegisterService, SessionService, ipCookie, DEFAULT_DOMAIN, toaster, md5,  MainService,UserCenterService) {

    $scope.user = {
      inviteCode: $stateParams.inviteCode
    };

    var loginUrlclicked = "images/suning-corp/suning_11_1.png";
    var registerUrlclicked = "images/suning-corp/suning_10_1.png";
    var loginUrlclick = "images/suning-corp/suning_11_2.png";
    var registerUrlclick ="images/suning-corp/suning_10_2.png";

    $scope.regImgUrl = registerUrlclicked;
    $scope.loginImgUrl = loginUrlclick;

    var lpclose = $('#lpclose');
    lpclose.click(function() {
      $('#aadialog').fadeOut(200);
    });

    $scope.showRegister = true;
    $scope.showLogin = false;

    $scope.backtop = function() {
      $('html,body').animate({
        scrollTop: '0px'
      }, 300);
    };

    $scope.submitRegisterMobile = function(user) {
      RegisterService.loadPageRegister.save({
        name: user.name,
        type: 0,
        account: user.mobile,
        captcha: user.mobileCaptcha,
        password: md5.createHash(user.password),
        from: ipCookie('utm_from'),
        act: ipCookie('act')
      }, function(response) {
        if (response.ret === 1) {
          SessionService.set('user', response.data.user.name);
          $state.go('root.register-mobile-success');
        } else {
          toaster.pop('warning', '提示', response.msg);
          $state.go('root.registerMobile');
        }
      });
    };

    $scope.submitSuningRegisterMobile = function(user) {
      RegisterService.loadPageRegister.save({
        name: user.name,
        type: 0,
        account: user.mobile,
        captcha: user.mobileCaptcha,
        password: md5.createHash(user.password),
        from: ipCookie('utm_from'),
        act: ipCookie('act')
      }, function(response) {
        if (response.ret === 1) {
          SessionService.set('user', response.data.user.name);
          $state.go('root.suning-success',{SuccessStatus:2});
          $rootScope.suningMessage = "恭喜您，注册成功！";
        } else {
          toaster.pop('warning', '提示', response.msg);
          $state.go('root.registerMobile');
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

    $scope.selectTab = function(clickedFlag){
     
      /**
       *  clickedFlag ===1 为快速注册 
       *  clickedFlag ===2 为快速登陆
       *  md5.createHash("123");
       */


        if(clickedFlag === 1){
          $scope.showRegister = true;
          $scope.showLogin = false;
          $scope.regImgUrl = registerUrlclicked;
          $scope.loginImgUrl = loginUrlclick;

        }else if(clickedFlag ===2){
          $scope.showLogin = true;
          $scope.showRegister = false;
          $scope.regImgUrl = registerUrlclick;
          $scope.loginImgUrl = loginUrlclicked;
        }

    };

    $scope.login = function(user) {
      /**
       * 记住用户名处理
       */
      if ($scope.rememberUserName) {
        ipCookie('userName', user.account, {
          expires: 60
        });
      }
      var password = md5.createHash(user.password);
      LoginService.userLogin.get({
        account: user.account,
        password: password,
        guestId: ipCookie('guestId')
      }, function(response) {
        if (response.ret === 1) {
          SessionService.set('user', response.data.user.name);
          $rootScope.loginName = response.data.user.name;
          $rootScope.isLogged = true;
          $rootScope.securityStatus = response.data.securityStatus;
          $state.go('root.suning-success',{SuccessStatus:1});
          toaster.pop('success', '恭喜您，登录成功！');
          
        } else {
          $scope.isPasswordError = true;
          if (response.code === -1009) {
            toaster.pop('error', response.msg);
          } else if (response.code === -1008) {
            toaster.pop('error', response.msg);
          }
        }
      });
    };

    $scope.$watch('user.password', function() {
      $scope.isPasswordError = false;
    });

    $scope.$watch('user.account', function() {
      $scope.isPasswordError = false;
    });

    $scope.logout = function() {
      SessionService.destory('user');
      $rootScope.loginName = '';
      $rootScope.isLogged = false;
      $state.go('root.login');
    };
    $scope.islogged = function() {
      if (SessionService.get('user')) {
        return true;
      }
    };


    if ($rootScope.channelCode) {
      MainService.trafficStats.get({
        from: $rootScope.channelCode
      });
    }

  });
