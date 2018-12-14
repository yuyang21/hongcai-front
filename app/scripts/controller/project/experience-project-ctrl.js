'use strict';
angular.module('hongcaiApp')
  .controller('ExperienceProjectCtrl', function($scope, $state, $rootScope, ProjectService, OrderService, $alert, toaster) {

    $scope.getExperienceProjectDetails = function() {
      var projectDetails = ProjectService.getExperienceProjectDetail.get({}, function() {
        if (projectDetails.ret === 1) {
          $scope.project = projectDetails.data.project;
          $scope.investCount = projectDetails.data.investCount;
        } else {
          toaster.pop('warning', projectDetails.msg);
        }
      });
    };

    $scope.getExperienceProjectDetails();

    /**
     * 出借
     */
    $scope.showMsg = false;
    $scope.quickInvest = function(){
      if(!$rootScope.isLogged){
        $rootScope.tologin();
        return;
      }

      // $rootScope.toNotice();

      if($rootScope.securityStatus.trusteeshipAccountStatus === 1){
        if($scope.account.experienceAmount > 100){
          OrderService.saveExperienceMoneyOrder.get({
            amount: $rootScope.account.experienceAmount,
            number: $scope.project.number,
            isRepeat: 2,
            payAmount : 0
          }, function(response) {
            if (response.ret === 1) {
              $scope.creditRight = response.data.creditRight;

              if($scope.creditRight !== null) {
                $state.go('root.yeepay-callback', {
                  business: 'EXPERIENCE',
                  status: 'SUCCESS',
                  amount: $rootScope.account.experienceAmount,
                  number: $scope.creditRight.number,
                  profit: $scope.creditRight.profit
                });
              } else{
                $scope.showMsg = true;
                $scope.msg = response.msg;
              }
            } else {
              $scope.showMsg = true;
              $scope.msg = response.msg;
            }
          });
        }else{
          $scope.showMsg = true;
          $scope.msg = '体验金小于100元，无法出借';
        }
      }else{
        $scope.toRealNameAuth();
      }
    }

    /**
     * 完善资料
     */
    $scope.toRealNameAuth = function() {
      $alert({
        scope: $scope,
        template: 'views/modal/modal-realNameAuth.html',
        show: true
      });
    };
  });
