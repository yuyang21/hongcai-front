'use strict';
angular.module('hongcaiApp')
  .controller('ActivateLandingCtrl', function($scope, $state, $rootScope) {
    $rootScope.pageTitle = '银行存管介绍' + ' - 宏财网';
    $scope.status = 0; //默认0未上线状态，1上线中
    //获取当天0点
    var getStartTime = function (t) {
      var start = t ? new Date(t) : new Date();  
          start.setHours(0);  
          start.setMinutes(0);  
          start.setSeconds(0);  
          start.setMilliseconds(0);  
      return Date.parse(start); 
    };
    var onlineDate = getStartTime('2017-06-26')/1000/60/60/24, //上线日
        curDate = getStartTime()/1000/60/60/24;  // 当天
    $scope.countDayFirst = onlineDate - curDate > 9 ? (onlineDate - curDate).toString().slice(0,1) : 0;
    $scope.countDaySecond = onlineDate - curDate > 9 ? (onlineDate - curDate).toString().slice(1,2) : (onlineDate - curDate);
    var differ1 = new Date('2017-06-29 11:00:00').getTime() - new Date('2017-06-26 21:00:00').getTime(); //上线中距正式上线毫秒值
    var differ2 = new Date('2017-06-29 11:00:00').getTime() - new Date().getTime(); //当前距正式上线的毫秒值
    var differ3 = differ1 - differ2;
    $scope.status = (differ3 >= 0 && differ2 > 0) ? 1 : 0;
    $scope.toOpen = function(){
      if(!$rootScope.isLogged){
          $rootScope.tologin();
          return;
        }

        if($rootScope.realNameAuthState ===1 && !$rootScope.isActive){
          $state.go("root.recharge-transfer", {amount:0, business: 'ACTIVE'});
        } else if($rootScope.realNameAuthState == 0){
          $rootScope.toRealNameAuth();
        }
    }

  });
