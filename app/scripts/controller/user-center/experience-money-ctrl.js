'use strict';
angular.module('hongcaiApp')
  .controller('ExperienceMoneyCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, toaster, $alert) {
    $scope.datas = [];

    UserCenterService.privilegedCapital.get({}, function(response){
      if (response) {
          $scope.privilegedCapital = response;
        } else {
          toaster.pop('warning', response.msg);
        }
    });

    $scope.loadDetails = function(page, pageSize){
      UserCenterService.privilegedCapitalDetails.get({
        page: page,
        pageSize: pageSize
      }, function(response) {
        if (response) {
          $scope.currentPage = page;
          $scope.pageSize = response.pageSize;
          $scope.count = response.total;
          $scope.numberOfPages = Math.ceil($scope.count / pageSize);
          $scope.datas = response.data;
        } else {
          toaster.pop('warning', response.msg);
        }
      });
    };

    $scope.currentPage = 1;
    $scope.pageSize = 5;

    $scope.loadDetails($scope.currentPage, $scope.pageSize);
  });
