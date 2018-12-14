'use strict';
angular.module('hongcaiApp')
  .controller('AppointmentProjectCtrl', function($scope, $state, $stateParams, $rootScope, $location, $interval, ProjectService, toaster, DateUtils) {
    var response = ProjectService.appointmentProject.get({}, function() {
      if (response.ret === 1) {
        $scope.project = response.data.project;
        $scope.baseFileUrl = response.data.baseFileUrl;
        $scope.statusMap = response.data.statusMap;
        $scope.statusText = $scope.statusMap[$scope.project.status];
        $scope.repaymentTypeMap = response.data.repaymentTypeMap;
        $scope.repaymentName = $scope.repaymentTypeMap[$scope.project.repaymentType];
        $scope.project.countdown = (new Date($scope.project.releaseStartTime).getTime() - response.data.serverTime)/1000 + 2;
        $scope.counter = 0;
        var interval = $interval(function() {
          $scope.project.countdown--;
          $scope._timeDown = $scope.timeUntil($scope.project.countdown);
          $scope.$apply();
        }, 1000);

        $scope.$on('$stateChangeStart', function() {
          clearInterval(interval);
        });
      } else {
        $scope.data = [];
        toaster.pop('warning', '服务器正在努力的加载....请稍等。');
        //console.log('ask project-list, why projectList did not load data...');
      }
    });

    $scope.timeUntil = function(stDate) {
      if (stDate <= 0) {
        $state.reload();
      } 

      var time = DateUtils.toDayHourMinSeconds();
      return time.day + '天，' + day.hour + '时,' + day.min + '分,' + day.seconds + '秒';
    };
  });
