'use strict';
angular.module('hongcaiApp')
  .controller('LuckyDrawCtrl', ['$scope', '$state', 'UserCenterService', '$alert', '$timeout', function($scope, $state, UserCenterService, $alert, $timeout) {
    $scope.status = 0;

    $scope.ScrollImgLeft = function() {
      var speed = 30;
      var scrollBegin = document.getElementById('scroll_begin');
      var scrollEnd = document.getElementById('scroll_end');
      var scrollDiv = document.getElementById('scroll_div');
      scrollEnd.innerHTML = scrollBegin.innerHTML;

      function Marquee() {
        if (scrollEnd.offsetWidth - scrollDiv.scrollLeft <= 0) {
          scrollDiv.scrollLeft -= scrollBegin.offsetWidth;
        } else {
          scrollDiv.scrollLeft++;
        }
      }
      var MyMar = setInterval(Marquee, speed);
      scrollDiv.onmouseover = function() {
        clearInterval(MyMar);
      };
      scrollDiv.onmouseout = function() {
        MyMar = setInterval(Marquee, speed);
      };
    };

    UserCenterService.getLuckyList.get(function(response) {
      if (response.ret === 1) {
        $scope.lotteryRecords = response.data.lotteryRecords;
        $scope.hongYunProject = response.data.hongYunProject;
        $scope.tuhaoProject = response.data.tuhaoProject;

        var winnerNum = $scope.lotteryRecords.length;
        $scope.checkRender = function() {
          $timeout.cancel(mytimeout);
          if (winnerNum > 4 && angular.element('#scroll_begin span').length === winnerNum) {
            $scope.ScrollImgLeft();
          } else {
            mytimeout = $timeout($scope.checkRender, 50);
          }
        };
        var mytimeout = $timeout($scope.checkRender, 1);
      } else {
        $scope.msg = response.msg;
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
      }
    });

    var luckyDrawOn = false;
    $scope.luckyDraw = function() {
      if (!luckyDrawOn) {
        $scope.msg = '活动已过期';
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
      } else {
        UserCenterService.luckyDraw.get(function(response) {
          if (response.ret === 1) {
            var hongbaoLevel = response.data.userHongbaoLottery.prizeLevel;
            if (hongbaoLevel === 0) {
              // 土豪状态
              $scope.status = 2;
            } else if (hongbaoLevel === 1) {
              // 普通宏包状态。
              $scope.status = 1;
            }
          } else {
            $scope.msg = response.msg;
            $alert({
              scope: $scope,
              template: 'views/modal/alert-dialog.html',
              show: true
            });
          }
        });
      }
    };

    $scope.goToRule = function() {
      $state.go($scope.isLogged === true ? 'root.userCenter.gift-overview' : 'root.login');
    };

  }]);
