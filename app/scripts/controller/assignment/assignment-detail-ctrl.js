'use strict';
angular.module('hongcaiApp')
  .controller('AssignmentDetailCtrl', function($scope, $state, $rootScope, $location, $stateParams, $window, CreditService, $modal, $alert, toaster, DateUtils, UserCenterService, ProjectService, RESTFUL_DOMAIN) {
    var number = $stateParams.number;
    // $rootScope.toActivate();

    // 获取用户是否签署出借风险及禁止性行为告知书
    $scope.riskStatement = function () {
      ProjectService.riskStatement.get({}, function (response) {
        if (response && response.ret !== -1) {
          $scope.signFlag = response.signFlag;
        }
      })
    }

    // 获取用户风险等级投资限额
    $scope.riskInvestAmount = function () {
      ProjectService.riskInvestAmount.get({
        number: $scope.projectNum,
        userId: 0
      }, function (response) {
        $scope.symbolLimits = response.investAmount;
      })
    }

    // 获取当前时间
    $scope.serverTime = function () {
      UserCenterService.serverTime.get({}, function (response) {
        if (response && response.ret !== -1) {
          $scope.currentDate = response.time
        }
      })
    }

    // 获取用户是否进行过风险测评
    $scope.recentlyQuestionnaire = function () {
      UserCenterService.recentlyQuestionnaire.get({
        userId: 0
      }, function (response) {
        if (response.score2 == -1) {
          $scope.questionnareStatus = false;
        } else {
          $scope.questionnareStatus = true;
          $scope.riskStatement();
          $scope.riskInvestAmount();
          $scope.serverTime();
        }
      })
    }

    $scope.toQuestion = function () {
      $state.go('root.userCenter.questionnaire',{number: number})
    }

    // 出借上限弹窗
    $scope.alertQuestion = function () {
      ProjectService.riskInvestLimits.get({
        number: $scope.projectNum,
        userId: 0
      }, function (response) {
        $scope.riskInvestLimits = response.riskInvestLimits;
        $scope.rankSymbol = response.symbol;
        $scope.totalSymbolLimits = response.symbolLimits;
        $scope.riskTolerance = response.riskInvestLimits.riskToleranceDesc;
        $alert({
          scope: $scope,
          template: 'views/modal/alert-toQuestion.html',
          show: true
        });
      })
    }

    /**
     * 债券详情
     */
    $scope.getCreditAssignment = function () {
      CreditService.getCreditAssignment.get({
        number: number
      },function(response){
        if(response && response.ret !== -1) {
          $scope.creditProject = response;
          $scope.annual = response.annualEarnings;
          $scope.creditNum = $scope.creditProject.number;
          $scope.projectNum = response.projectNumber;
          $scope.originalAnnual = response.originalAnnualEarnings;
          $scope.remainDay = response.remainDay;
          $scope.discountScale = response.discountScale || 0;
          $scope.assignmentType = response.type;
          
          response.status === 1 ? $scope.recentlyQuestionnaire() : null;

          $scope.projectTexts(response.projectId);
          $scope.originProjectBills($scope.projectNum);
          $scope.projectDetails($scope.projectNum);
          $scope.watchInvestAmount = function(newVal, oldVal){
            $scope.error = '';
            $scope.symbolLimitsErr = false;
            if( newVal ==null || newVal == undefined || newVal != oldVal) {
                $scope.errMsg = '';
            }
            if( newVal < 0) {
                $scope.errMsg = '出借金额必须大于等于100';
            }
            if(newVal && newVal < 100) {
                $scope.errMsg = '出借金额必须大于等于100';
            }
            if(newVal) {
              if(newVal == 100 && $rootScope.account.balance >=100 && $scope.creditProject.currentStock *100 >=100) {
                $scope.errMsg = '';
              }
              if(newVal % 100 !== 0) {
                $scope.errMsg = '出借金额必须为100的整数倍';
              }
              if (newVal > $scope.symbolLimits && $scope.symbolLimits >= 0) {
                $scope.symbolLimitsErr = true;
                $scope.errMsg = '最大可出借金额' + $scope.symbolLimits + '元，';
              } else if(newVal >  $rootScope.account.balance || (newVal <= $rootScope.account.balancenewVal && $rootScope.account.balancenewVal < $scope.realPayAmount)) {
                $scope.errMsg = '账户余额不足，请先充值';
              } else if(newVal > $scope.creditProject.currentStock *100) {
                $scope.errMsg = '出借金额必须小于' + $scope.creditProject.currentStock *100;
              }

              //上次还款到认购当日的天数（当期已产生利息天数）
              var lastPayDays = DateUtils.intervalDays($scope.currentDate, $scope.lastRepayDay) * ($scope.currentDate > $scope.lastRepayDay ? 1 : -1);
              // console.log('当期已产生利息天数：' + lastPayDays);
              // 项目剩余天数
              var remainDay = DateUtils.intervalDays($scope.repaymentDate, $scope.currentDate) * ($scope.repaymentDate > $scope.currentDate ? 1 : -1);
              $scope.remainDay = remainDay;
              // console.log('剩余天数：' + remainDay);
              var reward = ($scope.annual - $scope.originalAnnual) * newVal * $scope.remainDay / 36500;
              //  代收未收利息（当期已产生待收利息）
              $scope.exProfit = newVal * $scope.originalAnnual * lastPayDays / 36500;
              // console.log('当期已产生利息：' + $scope.exProfit);
              //实际支付金额
              var j = (newVal * $scope.remainDay * $scope.originalAnnual / 36500);
              // console.log('受让人应收（项目）原始利息' + j);
              //预计收益 = j + 利差（newVal + exProfit）* discountScale 
              // console.log('预计收益' + profit1);

              if ($scope.assignmentType === 0) {
                $scope.realPayAmount = newVal + $scope.exProfit - reward;
                $scope.profit = newVal * $scope.remainDay * $scope.annual / 36500;
              } else {
                $scope.realPayAmount = (newVal + $scope.exProfit) * (1 - $scope.discountScale / 100);
                // console.log('实付金额：' + $scope.realPayAmount);
                $scope.profit = j + (newVal + $scope.exProfit) * $scope.discountScale / 100;
              }

            }
          }

        }
      })
    }
    $scope.getCreditAssignment();
    /**
     * 转让记录
     */
     $scope.getCreditAssignmentList = function(page, pageSize) {
      ProjectService.getAssignmentOrders.get({
       number: $stateParams.number,
       page: page, 
       pageSize: pageSize
      }, function(response) {
        if(response && response.ret != -1) {
          $scope.assignmentOrders = response;
          $scope.pageSize0 = response.pageSize;
          // console.log($scope.assignmentOrders);
        }
      });
     };
     $scope.getCreditAssignmentList(1,12);

  

    /**
    * 立即认购
    */
    $scope.clicked = true;
    $scope.toInvest = function(amount) {
      $scope.clicked = false;
      var invest = function () {
        // 使用同步请求， 解决有可能弹窗被浏览器拦截的问题
        $.ajax({
          url: RESTFUL_DOMAIN + '/assignments/' + $scope.creditNum + '/orders' + '?amount=' + amount,
          'type': 'POST',
          async: false,
          dataType: 'json',
          success: function(response) {
            $scope.clicked = true;
            $scope.msg = '12';
            $scope.investAmount = amount;
            if (response && response.ret !== -1) {
              $alert({
                scope: $scope,
                template: 'views/modal/alertYEEPAY.html',
                show: true
              });

              $window.open('/#!/user-order-transfer/' + response.projectId + '/' + response.id + '/' + response.type + '?orderNumber=' + response.number, '_blank');
            }else if(response.code == -1037) {
              $rootScope.toFinishOrder();
            } else {
              toaster.pop('error', response.msg);
            }
          }
        });
      }
      $rootScope.migrateStatus(invest)
    };

    /**
     * 媒体报道
     */
    $scope.projectTexts = function(projectId) {
      ProjectService.projectTexts.get({
        projectId: projectId
      }, function(response) {
        $scope.mediaList = response.data.texts;
      });
    }

    //原项目还款记录
    $scope.originProjectBills = function (projectNum) {
      ProjectService.originProjectBills.get({
        number: projectNum
      }, function (response) {
        if (response && response.ret !== -1) {
          $scope.projectBills = response;
          $scope.latestProjectBill;
          for (var i = 0; i < response.length; i++) {
            if (response[i].status === 0) {
              $scope.latestProjectBill = response[i];
              break;
            }
          }
          $scope.lastRepayDay = $scope.latestProjectBill.lastRepaymentTime;
          $scope.repayDay = $scope.latestProjectBill.repaymentTime;
        }
      });
    }

    //查询原项目信息
    $scope.projectDetails = function (projectNum) {
      ProjectService.projectDetails.get({
        number: projectNum
      }, function (response) {
        if (response && response.ret !== -1) {
          $scope.project = response.data.project;
          $scope.repaymentDate = response.data.project.repaymentDate;
          $scope.baseFileUrl = response.data.baseFileUrl;
        }
      });
    }

    $scope.toLogin = function() {
      var thisUrl = $location.path();
      $location.path('/login').search({
        redirectUrl: thisUrl
      });
    };


    $scope.toRecharge = function() {
      if($rootScope.securityStatus.realNameAuthStatus !== 1) {
        $rootScope.toRealNameAuth();
        return;
      }
      $modal({
        scope: $scope,
        template: 'views/modal/modal-toRecharge.html',
        show: true
      });
    };



    $scope.tabs = [{
      title: '还款计划',
    }, {
      title: '出借记录',
    }];


    $scope.toggle = {};
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.toggle.activeTab = tabIndex;
    };

   
    
    $scope.load = function(page) {
      if(page !== $scope.assignmentOrders.index) {
        $scope.assignmentOrders.index = page;
      }

      $scope.getCreditAssignmentList(page, $scope.pageSize0);
    }
  });
