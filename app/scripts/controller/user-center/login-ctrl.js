'use strict';
angular.module('hongcaiApp')
  .controller('LoginCtrl', function($scope, $location, $state, $rootScope,$http, $stateParams, ProjectService, LoginService, SessionService, ipCookie, md5, toaster, UserCenterService) {

    // $rootScope.showHeader = false;
    $scope.goCurrentDepositDetail = function(){
      $http.defaults.headers.common['range']= '0-0';
      ProjectService.getFundsProjectListByProductType.get({type: 1, range:'0-1'}, function(response) {
        if (response.ret === 1) {
          $state.go('root.current-deposit-details', {number: response.list[0].fundsProject.number});
        }
      });
    }

    if (ipCookie('userName')) {
      $scope.user = [];
      $scope.user.account = ipCookie('userName');
    }

    $scope.login = function(user) {
      /**
       * 记住用户名处理
       */
      // if ($scope.rememberUserName) {
        ipCookie('userName', user.account, {
          expires: 60
        });
      // }
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
          toaster.pop('success', '恭喜您，登录成功！');
          UserCenterService.pushAllUnpullMessages.get(function(response) {
            if (response.ret === 1) {
              //console.info('pushmessage');
            }
          });
          if ($stateParams.redirectUrl) {
            $location.url($stateParams.redirectUrl);
          } else if ($location.path() !== '/login') {
            if ($rootScope.redirectUrl){
              $location.url($rootScope.redirectUrl);
            } else{
              $rootScope.loginModal.hide();
              $state.reload();
            }

          } else {
            $state.go('root.userCenter.account-overview');
          }
        } else {
          toaster.pop('error', response.msg);
          $scope.isPasswordError = true;
          if (response.code === -1009) {
            toaster.pop('error', response.msg);
          } else if (response.code === -1008) {
            toaster.pop('error', response.msg);
          }
        }
      });
    };

    $scope.pLogin = function(user) {

      /**
       * 记住用户名处理
       */
      if ($scope.rememberUserName) {
        ipCookie('bUserName', user.account, {
          expires: 60
        });
      }
      var md5Password = md5.createHash(user.password);
      LoginService.userLogin.get({
        account: user.account,
        password: md5Password,
        userType: 4,
        type: 1,
        guestId: ipCookie('guestId')
      }, function(response) {
        if (response.ret === 1) {
          SessionService.set('user', response.data.user.name);
          $state.go('root.userCenter.account-overview');
          $rootScope.loginName = response.data.user.name;
          $rootScope.isLogged = true;
          toaster.pop('success', '恭喜您，登录成功！');
        } else if (response.code === -1009) {
          toaster.pop('error', response.msg);
          $scope.isPasswordError = true;

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
    };
    $scope.islogged = function() {
      if (SessionService.get('user')) {
        return true;
      }
    };

    angular.element('.dropdown').hover(function() {
      angular.element('#dropdown').css({
        'display': 'block'
      });
      angular.element('.dropdown .category').addClass('border-l-r');
    }, function() {
      angular.element('#dropdown').css({
        'display': 'none'
      });
      angular.element('.dropdown .category').removeClass('border-l-r');
    });

    /*angular.element('.dropdown').click(function(){
        angular.element('#dropdown').css({"display":"block"});
        angular.element('.dropdown .category').addClass('border-l-r');
    })*/
  });
