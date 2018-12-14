'use strict';
angular.module('hongcaiApp')
  .controller('SendMoneyCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, ngClipboard, $aside, $window, $modal, config, toaster, ActivityService) {
    /**
     * 返现排行榜
     */
    ActivityService.investReturnRank.get(function(response) {
      if (response.ret === 1) {
        $scope.rankList = response.data.ranks;
      } else {
        //console.log('ask invite-rebate, why getInviteList did not load data...');
      }
    });



  });
