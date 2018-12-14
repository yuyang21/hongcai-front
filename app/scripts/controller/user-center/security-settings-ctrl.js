'use strict';

angular.module('hongcaiApp')
  .controller('SecuritySettingsCtrl', function(ipCookie, $scope, $state, $http, $rootScope, $stateParams, checkPwdUtil, UserCenterService, SecuritySettingService, config, md5, $alert, DEFAULT_DOMAIN,$modal, toaster, ProjectService) {

    $scope.userbusiness = 2;
    $scope.strength = 1;
   
    $scope.getUserInfo = function () {
      //认证信息
      UserCenterService.userSecurityInfo.get({}, function(response) {
        if (response.ret === 1) {
          var userAuth = response.data.userAuth;
          var user = response.data.user;
          $scope.email = user.email;
          $scope.mobile = user.mobile;
          $scope.userId = user.id;
          if (userAuth && userAuth.authStatus === 2) {
            $scope.haveTrusteeshipAccount = true;
            // $scope.openTrustReservation = userAuth.autoTransfer;
          } else {
            $scope.haveTrusteeshipAccount = false;
          }
  
        } else {
          //console.log('ask security-settings, why userSecurityInfo did not load data...');
        }
      });
      
      //绑卡信息
      UserCenterService.getUserBankCard.get({}, function(response) {
        if (response.ret === 1) {

          var card = response.data.card;
          $scope.isAuth = response.data.isAuth;
          if (card) {
            $scope.haveCard = (card.status === 'VERIFIED');
            $scope.bankName = card.openBank;
            $scope.cardNo = card.cardNo ? card.cardNo.slice(-7) : '';
            $scope.isVerifying = (card.status === 'VERIFYING');
            $scope.unbinding = (card.status === 'INIT');
          } else {
            $scope.haveCard = false;
            $scope.isVerifying = false;
            $scope.unbinding = false;
          }
          
        } else {
          toaster.pop('error', response.msg);
        }
      });
    }
    $rootScope.isLogged ? $scope.getUserInfo() : null;
    //解绑银行卡
    $scope.confirmUnbindBankCard = function(){
      if($rootScope.account.tTotalAssets > 2){
        UserCenterService.unbindBankCardApply.get({}, function(response) {
          if (response && response.ret !== 1) {
            $scope.unbindBankCardApply = response;
            if($scope.unbindBankCardApply.status === 1){
              window.open('/#!/bankcard-transfer/1');
            }else{
              var act =  function () {
                $scope.msg = '11';
                $alert({
                  scope: $scope,
                  template: 'views/modal/alertYEEPAY.html',
                  show: true
                });
              }

              $rootScope.migrateStatus(act);
            }
          }
        });
      }else{
        window.open('/#!/bankcard-transfer/1');
      }
    };
    $scope.unbindBankCard = function() {
      // $rootScope.toNotice();
      var act = function () {
        UserCenterService.unbindBankCard.get({}, function(response) {
          if (response.ret === 1) {
            $state.go('root.yeepay-callback', {
              business: 'UNBIND_CARD',
              status: 'SUCCESS'
            });
          } else {
            toaster.pop('error', response.msg);
          }
        });
      }
      $rootScope.migrateStatus(act);
    };
    //绑定银行卡
    $scope.bindBankCard = function() {
      // $rootScope.toNotice();
      var act = function () {
        $scope.msg = '5';
        $alert({
          scope: $scope,
          template: 'views/modal/alertYEEPAY.html',
          show: true
        });
        window.open('/#!/bankcard-transfer/0');
      }
      $rootScope.migrateStatus(act);
    };

    $scope.bindMobile = function(mobileNo, captcha) {
      UserCenterService.bindMobile.get({
        mobile: mobileNo,
        captcha: captcha,
        business: 2
      }, function(response) {
        if (response.ret === 1) {
          $scope.mobile = mobileNo.substr(0, 3) + '****' + mobileNo.substr(7, 11);
          $scope.changeMobile = false;
          $scope.mobileNo = null;
          $scope.inputCaptcha = null;
          $rootScope.securityStatus.mobileStatus = 1;
        } else {
          //console.log('ask security-settings, why bindMobile did not load data...');
        }
      });
    };

    $scope.bindEmail = function(email) {
      UserCenterService.bindEmail.get({
        email: email
      }, function(response) {
        if (response.ret === 1) {
          $scope.msg = '操作成功';
          $alert({
            scope: $scope,
            template: 'views/modal/alert-dialog.html',
            show: true
          });
          $scope.email = email.substr(0, 2) + '****' + email.substr(email.indexOf('@'));
          $scope.changeEmail = false;
          $scope.newEmail = null;
          $rootScope.securityStatus.emailStatus = 1;
        } else {
          //console.log('ask security-settings, why bindEmail did not load data...');
        }
      });
    };

    $scope.checkTwoPassword = function(password) {
      if (password) {
        if (password.repeatNewPassword !== password.newPassword) {
          return false;
        } else {
          return true;
        }
      }
    };

    var md5Password = function(password) {
      return md5.createHash(password);
    };
    $scope.changePassword = function(password) {

      if (password.repeatNewPassword !== password.newPassword) {
        return;
      }
      UserCenterService.changePassword.get({
        oldPassword: md5Password(password.oldPassword),
        newPassword: md5Password(password.newPassword),
        repeatNewPassword: md5Password(password.repeatNewPassword)
      }, function(response) {
        if (response.ret === 1) {
          $scope.changPwd = false;
          $scope.password = null;
          $state.go('root.login');
        } else if (response.ret === -1) {
          if (response.code === -1021) {
            $scope.isOldPasswordTrue = false;
          } else {
            toaster.pop('error', response.msg);
          }
        } else {
          //console.log('ask security-settings, why changePassword did not load data...');
        }
      });
    };
    // 新密码强度
    var pwdParttern = /^(?=.*[a-zA-Z])(?=.*[0-9])[\da-zA-Z~!@#$%^&*]{6,22}$/
    $scope.$watch('password.newPassword', function (newVal, oldVal) {
      $scope.pwdErrMsg = ''
      if (!pwdParttern.test(newVal)) {
        $scope.pwdErrMsg = '长度6-22，数字或字母的组合，可以包含特殊字符~!@#$%^&*'
      }
      if (newVal && newVal.length > 21) {
        $scope.password.newPassword = newVal.substr(0, 21);
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
     * 修改手机号码
     */
   
    $scope.resetMobile = SecuritySettingService.getter().reset?true:false;
    $scope.resetMobilenum = function(user) {
      var regexp = new RegExp('^((13[0-9])|(15[^4,\\D])|(18[0-9])|(17[0678])|(14[0-9]))\\d{8}$');
      if(!regexp.test(user.mobile)) {
        return;
      }

      UserCenterService.resetMobile.post({
        mobile: user.mobile,
        captcha: user.inputCaptcha
      }, function(response){
        $scope.showMsg = false;
        if(response.ret && response.ret !==1){
          $scope.showMsg = true;
          $scope.captchaErrMsg = response.msg;
          return;
        }
        toaster.pop('success', '恭喜您，修改成功！');
        $scope.user.mobile = null;
        $scope.user.picCaptcha = null;
        $scope.user.inputCaptcha = null;
        $scope.resetMobile = false;
        UserCenterService.userSecurityInfo.get({}, function(response) {
          if (response.ret === 1) {
            var user = response.data.user;
            $scope.mobile = user.mobile;
          }
        });
      })
    };


    $scope.openTrusteeshipAccount = SecuritySettingService.getter().realName?true:false;
    $scope.checkEmailAndMobile = function() {
      if (!$scope.mobile) {
        $scope.openTrusteeshipAccount = false;
        $scope.msg = '请先绑定手机号码';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
      }
    };
    $scope.realNameAuth = function(user) {
      var act = function () {
        $scope.msg = '1';
        $alert({
          scope: $scope,
          template: 'views/modal/alertYEEPAY.html',
          show: true
        });
        $scope.openTrusteeshipAccount = false;
        window.open('/#!/righs-transfer/' + user.realName + '/' + user.idCardNo + '/0?autoTransfer=' + $rootScope.autoTransfer);
      }
      $rootScope.migrateStatus(act);
    };

    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };

    $scope.reload = function () {
      $state.reload();
    }

    $scope.getAutoTransfer = function () {
      UserCenterService.autoTender.get({
        userId: 0
      }, function(response){
        //1.开启  2. 过期 3.禁用 0已开启还未到开始日期
        $scope.openTrustReservation = response.status;
      })
    }
    $rootScope.isLogged ? $scope.getAutoTransfer() : null
  
    if (ipCookie('modal')) {
      $rootScope.goToTender();
      ipCookie.remove('modal');
    }


    //风险测评显示
   
    UserCenterService.recentlyQuestionnaire.get({userId: 0}, function(response){
      $scope.score2 = response.score2;
      if($scope.score2 == -1 || !$rootScope.isLogged) {
        $scope.questionnareStatus = '未测评';
      } else {
        $scope.questionnareStatus = response.riskTolerance;
      }
    })

    //去风险测评
    $scope.toQuestionnare = function() {
      $state.go('root.userCenter.questionnaire');
    }
    
  });
