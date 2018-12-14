/**
 * 用户交易记录页
 */
'use strict';
angular.module('hongcaiApp')
  .controller('UserDealCtrl', function ($scope, $rootScope, toaster, UserCenterService) {
    $scope.type = 0;
    $scope.dateInterval = 0;
    $scope.dealType = 0;
    $scope.currentPage = 1;
    $scope.pageSize = 7;
    var date = new Date(); 
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    var nowDate = date.getTime();
    $scope.dateIntervalList = [
      {
        'type': '全部',
        'no': '0'
      },{
        'type': '今天',  //包含：项目正常回款、债权转让回款
        // 'no': [new Date().setHours(0).setMinutes(0).setSeconds(0).setMilliseconds(0).getTime(), new Date().getTime()]
      },{
        'type': '最近一周',
        'no': '7'
        // new Date().setDate(new Date().getDate() - 7), new Date().getTime()
      },{
        'type': '近一个月',
        // 'no': '111111111,222222'
        'no': '30'
      },{
        'type': '近六个月',  
        'no': '180'
        // 'no': new Date().setDate(new Date().getDate() - 180), new Date().getTime()
      }
    ]

    $scope.dealTypeList = [
      {
        'type': '全部',
        'no': ''
      },{
        'type': '回款',  //包含：项目正常回款、债权转让回款
        'no': '4,16'
      },{
        'type': '出借',
        'no': '3'
      },{
        'type': '充值',
        'no': '1'
      },{
        'type': '提现',  
        'no': '2'
      },{
        'type': '奖励',  //包含：奖金、代理人绩效
        'no': '18,27,28,29,30,35'
      },{
        'type': '其他',  //包含：提现手续费、债权转让手续费
        'no': '8,15'
      }
    ]
    $scope.selected1 = '全部';
    $scope.selected2 = '全部';
    //选择交易类型
    $scope.selectDealType = function(dealType){
      $scope.currentPage = 1;
      $scope.selected1 = dealType.type;
      $scope.dealType = dealType.no;
    }
    //选择起止日期
    $scope.selectdateInterval = function(dateInterval){
      $scope.currentPage = 1;
      $scope.selected2 = dateInterval.type;
      $scope.dateInterval = dateInterval.no;
      $scope.startTime = '';
      $scope.endTime = '';
      if (dateInterval.type == '今天') {
        $scope.startTime = nowDate;
        $scope.endTime = new Date().getTime();
      }
    }

    $scope.startEnd = function() {
      laydate({
        choose: function(datas){
          if ($('#start').val() && $('#end').val()) {
            $scope.startTime = new Date($('#start').val().replace(/\-/g, '/') + ' 00:00:00').getTime();
            $scope.endTime = new Date($('#end').val().replace(/\-/g, '/') + ' 23:59:59').getTime();
            $scope.getDeals(1);
          }
        }
      }) 
    }

    $scope.getDeals = function(page) {
      $scope.currentPage = page;
      var getDealByUser = UserCenterService.getDealByUser.get({ 
        dateInterval: $scope.dateInterval,
        dealType: $scope.dealType,
        startTime: $scope.startTime,
        endTime: $scope.endTime,
        page: page,
        pageSize: $scope.pageSize
      },function(response) {
        if (getDealByUser.ret === 1) {
          $scope.dealList = getDealByUser.data.dealList;
          $scope.type = getDealByUser.data.type;
          $scope.dateInterval = getDealByUser.data.dateInterval;
          $scope.userId = getDealByUser.data.userId;
          $scope.capital = getDealByUser.data.capital;
          $scope.dealTypes = getDealByUser.data.dealTypes;
          $scope.count = getDealByUser.data.count;
          $scope.data = [];
          $scope.totalPage = Math.ceil(getDealByUser.data.count / $scope.pageSize);

          for (var i = 0; i < $scope.dealList.length; i++) {
            $scope.data.push($scope.dealList[i]);
          }
          $scope.icons = [];
          for (var j in $scope.dealTypes) {
            var obj = {};
            obj.value = '' + j + '';
            obj.label = '' + $scope.dealTypes[j] + '';
            $scope.icons.push(obj);
          }

        } else {
          toaster.pop('warning',response.msg);
        }
      });
    };

    $scope.getDeals(1);

    $scope.rechargeTotal = 0;   //充值总额
    $scope.withdrawTotal = 0;   //提现总额

    //交易记录统计
    UserCenterService.dealData.get({},function(response) {
      if (response && response.ret !== -1) {
        for(var i= 0; i< response.length; i++){
          if (response[i].type == '1') {
            $scope.rechargeTotal += response[i].amount;
          }else if (response[i].type == '2') {
            $scope.withdrawTotal += response[i].amount;
          }
        }
      }
    })
  });

