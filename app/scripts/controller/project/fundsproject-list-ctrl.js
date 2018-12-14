'use strict';
angular.module('hongcaiApp')
  .controller('FundsProjectListCtrl', ['$scope', '$stateParams', '$rootScope', '$location', '$state', 'MainService', 'toaster', function($scope, $stateParams, $rootScope, $location, $state, MainService, toaster) {
    $rootScope.pageTitle = '宏金盈 - 宏财网';

    /**
     * 宏金盈列表
     */
    MainService.getIndexFundsProductList.get(function(response) {
      if (response.ret === 1) {
        $scope.fundsProjectStatusMap = response.data.fundsProjectStatusMap;
        $scope.fundsProjectProductList = response.data.fundsProjectProductList;
      }
    });

    $rootScope.selectPage = $location.path().split('/')[1];

  }]);
