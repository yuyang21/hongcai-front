'use strict';
angular.module('hongcaiApp')
  .controller('CreditCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster, $alert) {
    $scope.page = 1;
    $scope.pageSize = 5;
    $scope.showOther = false;
    $scope.currentPage = 1;
    $scope.limitTo = config.en === 'online' ? 13 : 10
    $scope.getProjectPrepaymentTime = function () {
      UserCenterService.projectPrepaymentTime.get({}, function (response) {
        if (response && response.ret !== -1) {
          $scope.projectPrepaymentTime = response.prepaymentTime
        }
      })
    }
    /**
     * 判断是否开通第三方托管账户
     */
    $scope.checkTrusteeshipAccount = function() {
      if ( $rootScope.securityStatus.trusteeshipAccountStatus === 1) {
        $scope.haveTrusteeshipAccount = true;
      } else {
        $scope.haveTrusteeshipAccount = false;
      }
      return $scope.haveTrusteeshipAccount;
    }



    /**
     * 第一步
     */
    $scope.creditStepFlag = 1;
    $scope.Math = window.Math;
    $scope.disabledFlag1 = $scope.disabledFlag2 = $scope.disabledFlag3 = false;
    /**
     * 解决ng-click ng-disabled的生效的问题。
     */
    $scope.$watch('creditStepFlag', function() {
      if ($scope.creditStepFlag === 1) {
        $scope.disabledFlag2 = true;
        $scope.disabledFlag3 = true;
      } else if ($scope.creditStepFlag === 2) {
        $scope.disabledFlag3 = true;
      } else {
        $scope.disabledFlag2 = false;
      }
    });

    /**
     * 我的债权统计数据  couponReturnProfit：加息券已收收益，holdingAmount：投资总额，profit：累计收益，包含待收收益，包含募集期贴息，totalProfit：已收收益，包含募集期贴息，discountInterest：募集期贴息
     */
    UserCenterService.getCreditRightStat.query({}, function(response) {
      for(var i = 0;i<response.length;i++) {
        var stat = response[i];
        //累计总额
        $scope.investStat.totalInvestAmount += stat.holdingAmount;
        $scope.investStat.profit += (stat.totalProfit + stat.couponReturnProfit);
        $scope.investStat.waitingProfit += ((stat.profit - stat.totalProfit + stat.discountInterest) + (stat.couponProfit - stat.couponReturnProfit)); // 待收收益
      }
    })
    
    

    /**
     * //统计投资各项占比 holdingInvestAmount 累计投资  totalInvestAmount 在投
     */
    $scope.investStat = {
      selection: 0,
      hornor:0,
      assignment:0,
      holdingAmount: 0,
      totalInvestAmount: 0,
      profit: 0,
      holdingCount:0,
      endProfitCount:0,
      waitingProfit: 0
    }
    $scope.showOther = false;
    $scope.getCreditRightStat =function(creditRightType) {
      UserCenterService.getCreditRightStat.query({}, function(response) {
        for(var i = 0;i<response.length;i++) {
          var stat = response[i];
          if(stat.creditRightType == 7){
            $scope.investStat.selection = stat.holdingAmount;
          } else if(stat.creditRightType == 8) {
            $scope.investStat.hornor = stat.holdingAmount;
          } else if (stat.creditRightType == 6) {
            $scope.investStat.assignment = stat.holdingAmount;
          } else if(stat.creditRightType == 3){
            $scope.showOther = true;
          }

          if (stat.creditRightType == creditRightType) {
            $scope.investStat.holdingCount = stat.holdingCount;
            $scope.investStat.endProfitCount = stat.endProfitCount;
          }

        }
        //在投总额
        $scope.investStat.holdingAmount = $scope.investStat.selection + $scope.investStat.hornor + $scope.investStat.assignment;
      })
    }
    
    /**
     * 加载债权
     * @param  page      第几页
     * @param  pageSize  每页数据长度
     * @param  status   状态
     */
    $scope.loadCredits = function(page, pageSize, status,type){
      UserCenterService.getHeldInCreditRightList.get({
        page: page,
        pageSize: pageSize,
        status: status,
        type: type
      }, function(response) {
        if (response.ret === 1) {
          $scope.searchStatus = status;
          $scope.currentPage = page;
          $scope.pageSize = pageSize;

          $scope.heldInCreditList = response.data.heldIdCreditList;
          $scope.creditRightTransferStatusMap = response.data.creditRightTransferStatusMap;
          $scope.creditRightStatusMap = response.data.creditRightStatusMap;
          $scope.productsMap = response.data.productsMap;
          $scope.fundsPoolInOutMap = response.data.fundsPoolInOutMap;
          $scope.count = response.data.count;
          $scope.numberOfPages = Math.ceil($scope.count / pageSize);
          $scope.heldInCreditList.length > 0 && status == 1 ? $scope.getProjectPrepaymentTime() : null
        } else {
          toaster.pop('warning', response.msg);
        }
      });

    }
    $scope.tabStatus = 7;
    $scope.searchStatus = parseInt($stateParams.searchStatus) || 1;
    $scope.tabToggle = function(tab, status) {
      $scope.tabStatus = tab;
      $scope.searchStatus = status;
      $scope.currentPage = 1;
      $scope.investStat.holdingCount = 0;
      $scope.investStat.endProfitCount = 0;
      $scope.loadCredits($scope.currentPage, $scope.pageSize, status, tab);
      $scope.getCreditRightStat(tab); 
    }
    $scope.tabToggle(7,1);



    //饼图设置
    
    $scope.$watch('investStat.holdingAmount', function(newValue, oldValue){
      var percent1,percent2,percent3;
      if($scope.investStat.totalInvestAmount == 0) {
        percent1 = percent2 = percent3 =  3;
      } else {
        percent1 = $scope.investStat.selection;
        percent2 = $scope.investStat.hornor;
        percent3 = $scope.investStat.assignment;
      }
      
      $scope.lineConfig = {
        theme:'default',
        dataLoaded:true
      };

      $scope.lineOption = {
        tooltip : {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            x: 'left',
        },
        title: {
          show: 25,
          text: "出借金额",
          textAlign: "middle",
          textBaseline: "middle",
          left: "38%",
          top: "38%",
          textStyle: {
              color: "#666666",
              fontWeight: "normal",
              fontSize: "13"
          }
        },
        series : [
          {
            name:'出借占比',
            type:'pie',
            data:[
              {value:percent1},
              {value:percent2},
              {value:percent3}
            ],
            radius: ["60%", "85%"],
            avoidLabelOverlap: false,
            clockwise: !1,
            labelLine: {
              normal: {
                show: !1
              }
            },
            label: {
              normal: {
                show: !1,
                 position: 'center'
              },
              emphasis: {
                show: 25,
                textStyle: {
                  fontSize: '13',
                  fontWeight: 'normal'
                }
              }
            },
          }
        ],
        color : [ '#2b8bf1','#0460cd','#ffaa25']
      }
    })

  });
