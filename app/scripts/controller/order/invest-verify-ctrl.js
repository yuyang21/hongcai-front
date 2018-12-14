'use strict';
angular.module('hongcaiApp')
  .controller('investVerifyCtrl', function($scope, $location, $state, $rootScope, $stateParams, $modal, OrderService, SessionService, config, $alert) {
    $scope.giftCount = 0;
    $scope.checkInvFlag = true;
    $scope.profit = 0;
    $scope.increaseRateProfit = 0;

    OrderService.investVerify.get({
      projectId: $stateParams.projectId,
      amount: $stateParams.amount,
    }, function(response) {
      if (response.ret === 1) {
        $scope.project = response.data.project;
        $scope.categoryCode = response.data.categoryCode;
        $scope.giftCount = response.data.giftCount;
        $scope.investAmount = $stateParams.amount;
        $scope.payAmount = response.data.payAmount;
        $scope.profit = $scope.calcProfit($scope.project.annualEarnings);
        // $scope.experienceAmount = response.data.experienceAmount;
        // $scope.experienceAmount = 0;
        $scope.icons = [];
        for (var i = 0; i <= $scope.giftCount; i++) {
          var obj = {};
          obj.value = '' + i + '';
          obj.label = '' + i + '';
          $scope.icons.push(obj);
        }

        /**
         * 加息券统计信息
         */
        OrderService.getUnUsedIncreaseRateCoupons.get({
          projectId: $stateParams.projectId,
          amount: $stateParams.amount
        }, function(response) {
          if (response.ret === 1) {
            $scope.increaseRateCoupons = response.data.increaseRateCoupons;
            $scope.selectCoupon = null;
            if($scope.increaseRateCoupons.length > 0){
              for(var i=0; i < $scope.increaseRateCoupons.length; i++){
                var rateText = '加息券 +' + $scope.increaseRateCoupons[i].rate + '%   <span class="ft-10 margin-l-6">有效期至' + moment($scope.increaseRateCoupons[i].endTime).format('YYYY-MM-DD') + '<span>';
                $scope.increaseRateCoupons[i].rateText = rateText;
              }
              var increaseRateCoupon = {
                number: "",
                rate: 0,
                rateText: "不使用加息券"
              }
              $scope.increaseRateCoupons.push(increaseRateCoupon);

              $scope.selectCoupon = $scope.increaseRateCoupons[0];
              $scope.increaseRateProfit = $stateParams.amount * $scope.project.projectDays * $scope.selectCoupon.rate / 36500
            }
          } else {
            toaster.pop('warning', response.msg);
          }
        });
        /*for(var i= 0; i <= $scope.giftCount; i++){
            angular.element('.select-area').append('<option value="' + i + '">'+ i +'</option>');
        }*/
      } else if (response.ret === -1) {
        if (response.code === 1) {
          $scope.msg = '抱歉，已经卖光了。';
          $modal({
            scope: $scope,
            template: 'views/modal/alert-dialog.html',
            show: true
          });
        } else {
          $scope.msg = response.msg;
          $modal({
            scope: $scope,
            template: 'views/modal/alert-dialog.html',
            show: true
          });
        }
      }

    });
    /**
     * 显示协议
     */
    $scope.showAgreement = function() {
      $modal({
        scope: $scope,
        template: 'views/modal/alert-showLoanSecurityAgreement.html',
        show: true
      });
    };

    $scope.transfer = function(project, investAmount, giftCount, selectCoupon) {
      $scope.msg = '4';
      $scope.investAmount = investAmount;
      $scope.page = 'investVerify';
      var couponNumber = selectCoupon == null ? "" : selectCoupon.number;
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      // window.open('/#!/invest-verify-transfer/' + project.id + '/' + investAmount + '/' + giftCount + '/' + couponNumber);
    };

    $scope.selectRateCoupon = function(){
      $scope.increaseRateProfit = $scope.calcProfit($scope.selectCoupon != null ? $scope.selectCoupon.rate : 0);
    }

    $scope.calcProfit = function(annualEarnings){
        var profit = $stateParams.amount * $scope.project.projectDays * annualEarnings / 36500 ;
        return profit;
    }

    var myOtherModal = $modal({
      scope: $scope,
      template: 'views/modal/modal-invest-verify.html',
      show: false
    });
    
    $scope.showModal = function() {
      myOtherModal.$promise.then(myOtherModal.show);
    };

    $scope.changeInvestAmount = function(investAmount) {
      $location.path('/invest-verify/' + $stateParams.projectId + '/' + investAmount);
    };

    $scope.backTo = function() {
      //window.location.href = 'project/' + $stateParams.projectId;
      $location.path('/project/' + $stateParams.projectId);
    };
    $scope.selectedIcon = 1;
    //console.log(typeof($scope.selectedIcon));
  });
