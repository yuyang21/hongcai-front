'use strict';
angular.module('hongcaiApp')
  .controller('assignmentsTransferCtrl',function (DateUtils, $location, $rootScope, $scope, $stateParams, UserCenterService, toaster, $state, $alert) {
    $rootScope.selectPage_two = $location.path().split('/')[2].split('-')[0];
    var creditRightNumber = $stateParams.number;

    /**
     * 债权转让相关规则
     */
    UserCenterService.assignmentRule.get({},function(response){
      if (response && response.ret !== -1) {
        $scope.discountFeeRate = response.discountFeeRate;
        $scope.borderDay = response.borderDay;
        $scope.minFee = response.minFee;
        $scope.lessThanOrEqualBorderDayFee = response.lessThanOrEqualBorderDayFee;
        $scope.greaterThanBorderDayFee = response.greaterThanBorderDayFee;
        $scope.recycleReward = response.recycleReward;
        $scope.maxReceivedPaymentsRate = response.maxReceivedPaymentsRate;
      }
    });
    /*
     * 债权信息
     */
    UserCenterService.assignmentCreditDetail.get({
      number: creditRightNumber
    }, function(response) {
      if (response && response.ret !== -1) {
        //现金券判断
        $scope.cashCoupon = $scope.recycleReward && response.increaseRateCoupon && response.increaseRateCoupon.type ===2 ? response.increaseRateCoupon.value : 0;
        $scope.creditRight = response.creditRight;
        //原有债权金额
        $scope.creditRightAmount = response.creditRight.transferableAmount;
        $scope.assignmentsNumber = response.creditRight.number;
        $scope.annualEarnings = response.project.annualEarnings;
        //步进值
        $scope.increaseAmount = response.project.increaseAmount;
        //原标利率
        $scope.creditBaseRate = response.creditRight.baseRate;
        $scope.transferPercent = 0;
        //creatTime(ms)
        $scope.creatTime = response.creditRight.createTime;
        //当前时间
        $scope.currentDate = new Date().getTime();
        UserCenterService.serverTime.get({}, function (response) {
          if (response && response.ret !== -1) {
            $scope.currentDate = response.time
          }
        })

        //上一次回款时间
        var lastRepaymentTime = response.projectBill ? response.projectBill.lastRepaymentTime :0;

        //剩余期限
        $scope.remainDay = DateUtils.intervalDays(response.project.repaymentDate, $scope.currentDate);

        //利率最大值
        // $scope.profitMax = 36500 * (1 - $scope.maxReceivedPaymentsRate) / $scope.remainDay + $scope.creditBaseRate;
        $scope.profitMax = 20;

        //应收利息天数（当期已产生利息天数）
        $scope.profitDate = DateUtils.intervalDays($scope.currentDate, lastRepaymentTime) * ($scope.currentDate > lastRepaymentTime ? 1 : -1);
        

        //利差年均收益 = 认购金额 * 剩余期限 * 利率差/36500
      
        //转让奖金=利差年化利率
        //利差
        // $scope.profitDown = $scope.transferPercent - $scope.creditBaseRate;
      }else {
        $('#amount').attr("disabled", true); 
        $('#percent').attr("disabled", true); 
        $('#transferBtn').attr("disabled", true); 
        $scope.showErrMsg = response.msg;
      }

    });

    //查询是否开通自动投标
    UserCenterService.autoTender.get({
      userId: $rootScope.loginUser.id
    }, function(response){
      if (response.status === 0 || response.status === 1) {
        $scope.showModal = true;
      }else {
        $scope.showModal = false;
      }
    });
    /**
     * 禁用自动投标
     */
    $scope.cancelAutoTender = function() {
      $alert({
        scope: $scope,
        template: 'views/modal/cancelAutoTender.html',
        show: true
      });
    };
    //禁用自动投标
    $scope.disabledAutoTender = function(){
      UserCenterService.disabledAutoTender.update({
        userId: $rootScope.loginUser.id,
        status: 3
      }, function(response){
        if (response.ret !== -1) {
          toaster.pop('success', '已禁用自动投标');
          $rootScope.reload();
        }
      })
    }
    $scope.goToAssignmentsTransfer = function(){
      UserCenterService.assignmentsTransfer.post({
        number: $scope.assignmentsNumber,
        creditRightId: $scope.creditRight.id,
        amount: $scope.transferAmount,
        discountScale: $scope.transferPercent
      }, function (response) {
        $scope.clicked = true;
        if(response && response.ret !== -1){
          toaster.pop('success', '转让成功');
          $state.go('root.userCenter.assignments');
        }else {
          toaster.pop('error', response.msg);
          $scope.showErrMsg = response.msg;
          $scope.clicked = false;
        }
      });
    }


    //确认转让
    $scope.clicked = false;
    $scope.assignmentsTransfer = function(){
      $scope.clicked = true;
      if ($scope.msg || $scope.errMsg || $scope.transferAmount ==undefined || $scope.showErrMsg || $scope.transferAmount <=0) {
        return;
      }

      if ($scope.showModal) {
        $scope.cancelAutoTender();
        return;
      }
      $scope.goToAssignmentsTransfer();
    }

    

    //监测转让金额
    $scope.$watch('transferAmount', function(newVal, oldVal){
      if(newVal !== oldVal){
        $scope.msg = undefined;
      }

      if (newVal) {
        $scope.clicked = false;
        $scope.showErrMsg = null;
        if(newVal == 0 ){
          $scope.msg = '请输入大于0的数字(最多精确到小数点后两位)';
        }else if(newVal < $scope.increaseAmount ){
          $scope.msg = '转让金额必须大于' + $scope.increaseAmount;
        }else if(newVal % $scope.increaseAmount !==0 ){
          $scope.msg = '转让金额必须为'+ $scope.increaseAmount +'的整数倍';
        }else if(newVal > $scope.creditRightAmount){
          $scope.msg = '转让金额必须小于债权金额';
        }
      }
      //手续费计算   // 原规则：该笔债权持有时间 < 30天，手续费 = 转让本金 * 1%，持有时间 ≥ 30天，手续费 = 转让本金 * 0.5%，单笔转让的手续费最低为3元。
      // if ($scope.currentDate - $scope.creatTime <= $scope.borderDay*24*60*60*1000) {
      //   $scope.counterFee = $scope.transferAmount * $scope.lessThanOrEqualBorderDayFee / 100 * $scope.discountFeeRate > $scope.minFee ? $scope.transferAmount * $scope.lessThanOrEqualBorderDayFee / 100 * $scope.discountFeeRate : $scope.minFee;
      // }else {
      //   $scope.counterFee = $scope.transferAmount * $scope.greaterThanBorderDayFee /100 * $scope.discountFeeRate > $scope.minFee ? $scope.transferAmount * $scope.greaterThanBorderDayFee /100 * $scope.discountFeeRate : $scope.minFee;
      // }

      // 现规则：手续费 = 转让本金 * 1%，单笔转让的手续费最低为3元。
      $scope.counterFee = $scope.transferAmount * $scope.lessThanOrEqualBorderDayFee / 100 * $scope.discountFeeRate > $scope.minFee ? $scope.transferAmount * $scope.lessThanOrEqualBorderDayFee / 100 * $scope.discountFeeRate : $scope.minFee;
      //待收未收利息(本期待收利息)
      $scope.profit = $scope.creditBaseRate * newVal * $scope.profitDate /36500;

      //应收（项目）原始利息
      $scope.ReProfit = $scope.creditBaseRate * newVal * $scope.remainDay / 36500;
      $scope.calculY(newVal, $scope.transferPercent);
    });

    //监测转让利率
    $scope.$watch('transferPercent', function (newVal, oldVal) {
      $scope.clicked = false;
      $scope.showErrMsg = null;
      if(newVal !== oldVal){
        $scope.errMsg = undefined;
      }
      if(newVal !== undefined){
        var re = /([0-9]+\.[0-9]{2})[0-9]*/;
        if(newVal < 0 ){
          $scope.errMsg = '最小折让比例为0%';
        } else if(newVal > $scope.profitMax ){
          $scope.errMsg = '最大折让比例为'+ $scope.profitMax.toFixed(1) +'%';
        } else if (re.test(newVal)) {
          $scope.errMsg = '最多输入一位小数';
        }  else {
          $scope.calculY($scope.transferAmount, newVal);
        }
      }
    });

    $scope.calculY = function (amount, percent) {
      percent = percent / 100;
      var value = (amount + $scope.profit) * (1 - percent);
      var k = (amount + $scope.ReProfit + $scope.profit - value) * 365 / (value * $scope.remainDay);
      $scope.exProfit = (k - $scope.creditBaseRate / 100) * 100;
      console.log('a:' + amount);
      console.log('b:' + $scope.remainDay);
      console.log('c:' + $scope.creditBaseRate);
      console.log('d:' + percent);
      console.log('e:' + $scope.profitDate);
      console.log('f:' + $scope.profit);
      console.log('h:' + value);
      console.log('j:' + $scope.ReProfit);
      console.log('k:' + k);
      console.log('i:' + $scope.exProfit);
    }

  });
