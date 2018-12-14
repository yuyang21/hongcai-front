'use strict';
angular.module('hongcaiApp')
  .controller('InvestmentplanListCtrl', ['$scope', '$stateParams', '$rootScope', '$location', '$state', 'ProjectService', 'toaster', function($scope, $stateParams, $rootScope, $location, $state, ProjectService, toaster) {
    $rootScope.pageTitle = '宏金盈 - 宏财网';

    $scope.baseFundsProductData = function() {
      ProjectService.getFundsProductTypeMap.get({}, function(response) {
        if (response.ret === 1) {
          $scope.productMap = response.data.productMap;
          // $scope.getFundsProjectListByProductType(1);
        } else {
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          if(console){
            //console.log('ask investmentplan-list, why getFundsProductIdList did not load data...');
          }
        }
      });

    };
    $scope.perPage = parseInt($location.search().perPage, 15) || 15;
    $scope.page = parseInt($location.search().page, 10) || 0;
    $scope.clientLimit = 250;
    $scope.urlParams = {
      type: '2'
    };

    $scope.$watch('page', function(page) {
      $location.search('page', page);
    });
    $scope.$watch('perPage', function(page) {
      $location.search('perPage', page);
    });
    $scope.$on('$locationChangeSuccess', function() {
      var page = +$location.search().page,
        perPage = +$location.search().perPage;
        // console.log(perPage);
      if (page >= 0) {
        $scope.page = page;
      }
      if (perPage >= 0) {
        $scope.perPage = perPage;
      }
    });
    $scope.baseFundsProductData();
    $scope.tabs = [{
      title: '月月盈',
    }, {
      title: '季度盈',
    }, {
      title: '半年盈',
    }];

    $scope.toggle = {};
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.urlParams.type = tabIndex + 2;
      $scope.toggle.activeTab = tabIndex;
    };
    $rootScope.selectPage = $location.path().split('/')[1];

  }]);
