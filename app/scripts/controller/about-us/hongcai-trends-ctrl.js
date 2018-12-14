'use strict';
angular.module('hongcaiApp')
  .controller('HongcaiTrendsCtrl', function($scope, $state, $location, $rootScope) {
    $rootScope.pageTitle = '宏财动态' + ' - 宏财网';

    $scope.perPage = parseInt($location.search().perPage, 10) || 5;
    $scope.page = parseInt($location.search().page, 10) || 0;
    $scope.clientLimit = 250;
    $scope.urlParams = {
      category: '3'
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
      if (page >= 0) {
        $scope.page = page;
      }
      if (perPage >= 0) {
        $scope.perPage = perPage;
      }
    });

    // AboutUsService.textList.get({category: 3}, function(response) {
    //     $scope.textList = response.data;
    //     $scope.baseFileUrl = response.data.baseFileUrl;
    //     $scope.orderProp = 'id';
    //     $scope.currentPage = 0;
    //     $scope.pageSize = 6;
    //     $scope.data = [];
    //     $scope.numberOfPages = function(){
    //         return Math.ceil($scope.data.length / $scope.pageSize);
    //     }
    //     for (var i = 0; i < $scope.textList.textList.length; i++) {
    //         $scope.data.push($scope.textList.textList[i]);
    //     }
    // });

  });
