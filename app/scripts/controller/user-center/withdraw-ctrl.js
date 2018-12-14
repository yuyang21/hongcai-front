'use strict';
angular.module('hongcaiApp')
  .controller('WithdrawCtrl', function($location, $scope, $state, $rootScope, $stateParams, UserCenterService, DEFAULT_DOMAIN, $alert, $modal, DateUtils) {
    // var Holiday = ['2017-04-29', '2017-04-30', '2017-05-01', '2017-05-28', '2017-05-29', '2017-05-30', '2017-10-01', '2017-10-02', '2017-10-03', '2017-10-04', '2017-10-05', '2017-10-06', '2017-10-07', '2017-10-08'];
    // var WeekendsOff = ['2017-05-27', '2017-09-30'];
    //法定节假日
    var Holiday = ['2018-02-15','2018-02-16','2018-02-17','2018-02-18','2018-02-19','2018-02-20','2018-02-21','2018-04-05', '2018-04-06','2018-04-07', '2018-04-29','2018-04-30','2018-05-01','2018-06-16', '2018-06-17', '2018-06-18','2018-09-22', '2018-09-23', '2018-09-24', '2018-10-01', '2018-10-02', '2018-10-03', '2018-10-04', '2018-10-05', '2018-10-06', '2018-10-07', '2018-10-08']
    //法定节假日调休
    var WeekendsOff = ['2018-02-24', '2018-04-08', '2018-04-28', '2018-09-29', '2018-09-30'];
    //当前时间
    var currentDate = new Date();
    $scope.nextDay = DateUtils.withdrawArriveDate(currentDate,Holiday,WeekendsOff);

    $scope.availableCash = 0;

    // 可提现金额查询
    UserCenterService.availableCash.get({}, function(response) {
      if (response && response.ret !== 1) {
        $scope.availableCash = response.account.availableCash;
        var cash = Math.floor($scope.availableCash * 100)/100;
        var withdrawFee = response.withdrawFee; // 提现手续费
        $scope.cardStatus = response.cardStatus;
        $scope.availableCashRealNo = cash >= withdrawFee ? cash - withdrawFee : 0;
      }
    });
    // 本月可免费提现次数查询
    UserCenterService.freeWithdrawCount.get({}, function(response) {
      if (response && response.ret !== 1) {
        $scope.freeWithdrawCount = response.freeWithdrawCount; // 免费提现次数
      }
    });

    $scope.checkLargestAmount = function(amount) {
        return amount > $scope.availableCashRealNo;
    };

    $scope.checkMinAmount = function(amount){
      return amount < 1;
    }
    $scope.getPicCaptcha = DEFAULT_DOMAIN + '/siteUser/getPicCaptcha?' + Math.random();
    $scope.refreshCode = function() {
      angular.element('#checkCaptcha').attr('src', angular.element('#checkCaptcha').attr('src').substr(0, angular.element('#checkCaptcha').attr('src').indexOf('?')) + '?code=' + Math.random());
    };


    $scope.withdraw = function(amount, captcha) {
      // $rootScope.toNotice();
      var act = function() {
        if($scope.checkMinAmount(amount) || $scope.checkLargestAmount(amount) || amount ===''){
          return;
        }
        if($rootScope.pay_company == 'cgt' && $rootScope.securityStatus.userAuth.active === false) {
          $rootScope.migrateStatus();
        } else {
          $scope.msg = '3';
          $scope.withdrawAmount = amount;
          $alert({
            scope: $scope,
            template: 'views/modal/alertYEEPAY.html',
            show: true
          });

          window.open('/#!/withdraw-transfer/' + amount + '/' + captcha);
        }
      }
      $rootScope.migrateStatus(act);

    };
    
    
    

  });
