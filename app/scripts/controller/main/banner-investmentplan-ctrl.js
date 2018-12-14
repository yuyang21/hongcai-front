'use strict';
angular.module('hongcaiApp')
  .controller('BannerInvPlanCtrl', ['$scope', 'MainService', '$location', function($scope, MainService, $location) {
    /**
     * 宏金盈列表
     */
    MainService.getIndexFundsProductList.get(function(response) {
      if (response.ret === 1) {
        $scope.fundsProjectStatusMap = response.data.fundsProjectStatusMap;
        $scope.fundsProjectProductList = response.data.fundsProjectProductList;
      }
    });
    $scope.hsh = $location.hash();

    $scope.addActive = function($event) {
      angular.element($event.target).closest('.col-xs-8').find('.active').removeClass('active');
      angular.element($event.target).closest('li').find('a').addClass('active');
    };
  }]);
