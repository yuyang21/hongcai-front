'use strict';

angular.module('hongcaiApp')
  .controller('AutoReservationCtrl', function(ipCookie, $scope, $state, $http, $rootScope, $stateParams, checkPwdUtil, UserCenterService, SecuritySettingService, config, md5, $alert, DEFAULT_DOMAIN,$modal, toaster, ProjectService) {

    $scope.setAutoTender = false;

    // document.getElementsByTagName("html")[0].style.overflow="hidden";
    $scope.blurUl = function($event) {
      var _con = angular.element('#projectTypeUl');   // 设置目标区域
      var input = angular.element('#input');   // 设置目标区域
      if(!_con.is($event.target) && _con.has($event.target).length === 0 && !input.is($event.target) && input.has($event.target).length === 0){ 
        $scope.showProjectType = false;
      }
      if (!_con.is($event.target) && _con.has($event.target).length === 0 && !input.is($event.target) && input.has($event.target).length === 0 && $scope.autoTender.investType.length == 0){
        $scope.noType = false;
      }
    }
  
    //自动投标
    $scope.autoTender = [];
    $scope.dateLine = [90,120,180,270,360,720];
    $scope.interestRate = [7,8,9,10,11,12];
    $scope.projectType = {
        '5': '宏财精选', 
        '6': '宏财尊贵', 
        '2': '债权转让',
        '0': '全部',
        '7': '新手标'
    };

    $scope.autoTender.investType = [];
    $scope.selectTypeText = '';
    $scope.showDateLine = false;
    $scope.showInterestRate = false;
    $scope.showProjectType = false;
    $scope.noType = true;

    $scope.dateLineFn = function(){
      $scope.showDateLine =!$scope.showDateLine;
    };
    $scope.interestRateFn = function(){
      $scope.showInterestRate =!$scope.showInterestRate;
    };
    $scope.projectTypeFn = function(enter){
      if(enter && $scope.autoTender.investType.length == 0){
          $scope.noType = false;
      } else {
        $scope.showProjectType =!$scope.showProjectType;
      }
    }
    $scope.selectDateLine = function(date){
      $scope.autoTender.selectedDateLine = date;
    };

    // 标的类型

    $scope.multiSelect = function(type,ev){
      if($scope.autoTender.investType.length <= 0){
        $scope.autoTender.investType.push(type);
      }else{
        if($scope.autoTender.investType.indexOf(type) == -1){
          $scope.autoTender.investType.push(type);
        }else{
          $scope.autoTender.investType.splice($scope.autoTender.investType.indexOf(type),1);
        }
      }
      
      $scope.selectTypeText = '';
      if($scope.autoTender.investType.length >= $scope.projectTypeNo.length){
        $scope.selectTypeText = '全部';
      }else{
        for(var i = 0; i< $scope.autoTender.investType.length; i++){
          $scope.selectTypeText += ',' + $scope.projectType[$scope.autoTender.investType[i]];
        }
        $scope.selectTypeText = $scope.selectTypeText.split('');
        $scope.selectTypeText.splice(0,1);
        $scope.selectTypeText = $scope.selectTypeText.join('');
      }
      if ($scope.autoTender.investType.length > 0) {
        $scope.noType = true;
      }
      if($scope.autoTender.investType.length == 1 && $scope.autoTender.investType[0] == '7' && $scope.autoTender.minInvestAmount > 10000){
        $scope.errorMsg1 = '最大投标金额为10000元';
      } else if ($scope.autoTender.minInvestAmount <= 1000000){
        $scope.errorMsg1 = '';
      }
    };

    //最小投标金额
    var pattern=/^[0-9]*(\.[0-9]{1,2})?$/;
    var pattern2= /^\+?[1-9][0-9]*$/;
    $scope.errorMsg1 = '';
    $scope.watchInvestAmount= function(newVal) {

      $scope.errorMsg1 = '';
      if (!$rootScope.isLogged) {
        return;
      }
      if (newVal === null) {
        $scope.errorMsg1 = '请输入最小投标金额';
      }
      if (newVal == 0) {
          $scope.errorMsg1 = '请输入大于0的数字';
      }
      if (newVal) {
        if (newVal >=0 && !pattern.test(newVal)) {
          $scope.errorMsg1 = '最多精确到小数点后两位';
        }else if(newVal % 100 !== 0 || !pattern2.test(newVal)){
          $scope.errorMsg1 = '请输入100元的正整数倍';
        }else if (newVal > 1000000) {
          $scope.errorMsg1 = '最大投标金额为1000000元';
        }else if (newVal && newVal > 10000 && $scope.autoTender.investType.length == 1 && $scope.autoTender.investType[0] == '7') {
          $scope.errorMsg1 = '最大投标金额为10000元';
        }
      }
      
    };
    //账户保留金额
    $scope.error2 = false;
    $scope.watchRetentionAmount= function(newVal) {
      $scope.errorMsg2 = '';
      if (!$rootScope.isLogged) {
        return;
      }
      if (newVal === null) {
        $scope.errorMsg2 = '请输入账户保留金额';
      }
      if (newVal) {
        if (newVal >=0 && !pattern.test(newVal)) {
          $scope.errorMsg2 = '最多精确到小数点后两位';
        }else if(newVal<= 0){
          $scope.errorMsg2 = '请输入大于0的数字';
        }else if (newVal > 1000000) {
          $scope.errorMsg2 = '最大保留金额为1000000元';
        }
      } 
      $scope.error2 = $scope.errorMsg2 === '' ? false : true;   
    };
    
    // 判断是否第一次投资
    $scope.isExist = false;
    ProjectService.isExist.get({userId: 0},function(response){
      if(!response.exist){
        $scope.projectTypeNo = [
          {
            type: '7'
          },
          {
            type: '5'
          },
          {
            type: '6'
          },
          {
            type: '2'
          }
        ];
      }else{
        $scope.isExist = true;
        $scope.projectTypeNo = [
          {
            type: '5'
          },
          {
            type: '6'
          },
          {
            type: '2'
          }
        ];
      }
      $rootScope.isLogged ? $scope.AutoTender() : null;
      
    })
    $scope.AutoTender = function () {
      //自动投标详情
      UserCenterService.autoTender.get({
        userId: 0
      }, function(response){
        //1.开启  2. 过期 3.禁用 0已开启还未到开始日期
        $scope.openTrustReservation = response.status;
        if (response.userId !== null) {
          $scope.autoTenderDetail = response;
          $scope.autoTender.investType = $scope.autoTenderDetail.investType.split('');
          $scope.autoTender.minInvestAmount = $scope.autoTenderDetail.minInvestAmount;
          $scope.autoTender.retentionAmount = $scope.autoTenderDetail.remainAmount;
          $scope.autoTender.selectedDateLine = $scope.autoTenderDetail.maxRemainDay;
          $scope.autoTender.annualEarnings = $scope.autoTenderDetail.annualEarnings;
          $scope.autoTenderDetail.startTime = $scope.autoTenderDetail.startTime;
          $scope.autoTenderDetail.endTime = $scope.autoTenderDetail.endTime;
          
          for(var i=0;i<$scope.autoTender.investType.length;i++){
            if($scope.autoTender.investType[i] === ','){
              $scope.autoTender.investType.splice(i,1);
            }
          }
          if($scope.isExist){
            if($scope.autoTender.investType.indexOf('7') !== -1){
              $scope.autoTender.investType.splice($scope.autoTender.investType.indexOf('7'),1);
            }
          }
          if($scope.autoTender.investType.length >= $scope.projectTypeNo.length){
            $scope.selectTypeText = '全部';
          }else{
            for(var i=0;i<$scope.autoTender.investType.length;i++){
              $scope.selectTypeText += (',' +  $scope.projectType[$scope.autoTender.investType[i]]);
            }
            $scope.selectTypeText = $scope.selectTypeText.split('').splice(1).join('');
          }
          $scope.openTrustReservation === 3 || $scope.openTrustReservation === 2 ? $scope.setAutoTender = false : $scope.setAutoTender = true;
        }else {
          $scope.setAutoTender = false;
          $scope.autoTender.selectedDateLine = '720';
          $scope.autoTender.annualEarnings = '7';
          $scope.isExist ? $scope.autoTender.investType = ['2', '5', '6'] : $scope.autoTender.investType = ['2', '5', '6', '7'];
          $scope.selectTypeText = '全部';
          $scope.autoTender.minInvestAmount = 100;
          $scope.autoTender.retentionAmount = 0;
          $scope.currentTime = new Date();
          $scope.endTime = new Date().setFullYear(new Date().getFullYear()+1);
        }
      });
    }
      
    $scope.disableDubble = true;
    //开启自动投标

    $scope.openReservation2 = function(autoTender){
      var startTime = new Date(new Date($('#start').val().split('-').join('/')).setHours(0,0,0)).getTime();
      var endTime = new Date(new Date($('#end').val().split('-').join('/')).setHours(23,59,59)).getTime();
      var updateTime_t = new Date().getTime();
      if (!$rootScope.isLogged) {
        return;
      }
      if(startTime > endTime){
        $scope.errorMsg3 = '结束时间要大于开始时间';
        toaster.pop('error', '结束时间要大于开始时间');
      } else if(endTime < updateTime_t){
        $scope.errorMsg3 = '结束时间要大于当前时间';
        toaster.pop('error', '结束时间要大于当前时间');
      } else {
        $scope.errorMsg3 = '';
      }
      
      if($scope.errorMsg3 != ''){
        return;
      }
      if(autoTender.investType.length == 0){
        return;
      }
      if(autoTender.investType.length == 1 && autoTender.investType[0] == '7' && autoTender.minInvestAmount > 10000){
        $scope.errorMsg1 = '最大投标金额为10000元';
        return;
      }
      //开启
      UserCenterService.autoTenders.post({
        userId: 0,
        minInvestAmount: autoTender.minInvestAmount,
        minRemainDay: 0,
        maxRemainDay: autoTender.selectedDateLine,
        annualEarnings: autoTender.annualEarnings,
        investType: autoTender.investType.join(','),
        remainAmount: autoTender.retentionAmount,
        startTime: startTime,
        endTime: endTime
      }, function(response) {
        $scope.disableDubble = true;
        if (response.ret !== -1) {
          toaster.pop('success', '已开启自动投标');
          $rootScope.reload();
        }
      })
    }
    //修改到编辑状态
    $scope.modify = function(){
      $scope.setAutoTender = false;
      $scope.currentTime = $scope.autoTenderDetail.startTime;
      $scope.endTime = $scope.autoTenderDetail.endTime;
    }
    var busy = false;
    //禁用自动投标
    $scope.disabledAutoTender = function(){
      if (busy) {
        return;
      }
      busy = true
      setTimeout(function() {
        busy = false
      }, 1000)
      $scope.disableDubble = false;
      UserCenterService.disabledAutoTender.update({
        userId: $rootScope.loginUser.id,
        status: 3
      }, function(response){
        $scope.disableDubble = true;
        if (response.ret !== -1) {
          toaster.pop('success', '已成功禁用自动投标功能');
          $rootScope.reload();
        }
      })
    }

    //显示取消自动投标授权弹窗
    $scope.showCancelAuthorization = function() {
      if (busy) {
        return;
      }
      busy = true
      setTimeout(function() {
        busy = false
      }, 1000)
      $modal({
        scope: $scope,
        template: 'views/modal/modal-cancelAuthorization.html',
        show: true
      });
    }

    // 取消自动投标授权
    $scope.cancelAuthorization = function() {
      if (busy) {
        return;
      }
      busy = true
      setTimeout(function() {
        busy = false
      }, 1000)
      UserCenterService.cancelUserAuthorization.post({
        userId: $rootScope.loginUser.id,
        device: 0
      }, function(response) {
        if (response && response.ret !== -1) {
          toaster.pop('success', '已成功取消自动投标授权');
          $rootScope.reload();
        } else {
          toaster.pop('warning', response.msg)
        }
      })
    }
  });
