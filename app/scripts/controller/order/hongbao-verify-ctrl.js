'use strict';
angular.module('hongcaiApp')
  .controller('hongbaoVerifyCtrl', ['$scope', '$location', '$state', '$rootScope', '$stateParams', '$modal', 'OrderService', 'SessionService', 'config', 'toaster', function($scope, $location, $state, $rootScope, $stateParams, $modal, OrderService, SessionService, config, toaster) {
    $scope.giftCount = 0;
    $scope.checkFlag = true;
    OrderService.hongbaoVerify.get({
      projectId: $stateParams.activityId,
      amount: $stateParams.amount,
    }, function(response) {

      if (response.ret === 1) {
        $scope.project = response.data.project;
        $scope.capital = response.data.capital;
        $scope.project.typeText = $scope.project.type === 2 ? '宏运' : '土豪';
        $scope.giftCount = response.data.giftCount;
        $scope.investAmount = $stateParams.amount;
        if ($scope.investAmount > $scope.capital) {
          toaster.pop('warning', '亲，宏包超额了');
          $location.path('activity/' + $stateParams.activityId + '/' + 2);
          return;
        }
      } else if (response.ret === -1) {
        if (response.code === 1) {
          toaster.pop('warning', '已经卖光啦！');
        } else {
          toaster.pop('error', response.msg);
        }
        $location.path('project-activity-group');
      }
    });

    $scope.saveHongYunOrder = function(project, investAmount) {
      $scope.checkFlag = false;
      if (project.type === 2) {
        OrderService.saveHongYunOrder.get({
          projectId: project.id,
          investAmount: investAmount
        }, function(response) {
          if (response.ret === 1) {
            toaster.pop('success', '支付成功,感谢您使用。');
            $state.go('root.userCenter.gift-rebate', {
              type: 99
            });

          }
        });
      } else {
        OrderService.saveTuhaoOrder.get({
          projectId: project.id,
          investAmount: investAmount
        }, function(response) {
          if (response.ret === 1) {
            toaster.pop('success', '支付成功,感谢您使用。');
            $state.go('root.userCenter.gift-rebate', {
              type: 99
            });

          }
        });
      }
    };
    $scope.backTo = function() {
      $location.path('/activity/' + $stateParams.activityId + '/' + $scope.project.type);
    };
  }]);
