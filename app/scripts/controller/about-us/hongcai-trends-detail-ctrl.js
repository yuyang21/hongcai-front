'use strict';
angular.module('hongcaiApp')
  .controller('HongcaiTrendsDetailCtrl', function($scope, $state, $rootScope, $stateParams, AboutUsService) {
    AboutUsService.textDetail.get({
      textId: $stateParams.textId
    }, function(response) {
      $scope.text = response.data.text;
      $scope.baseFileUrl = response.data.baseFileUrl;
      $rootScope.pageTitle = response.data.text.title + ' - 宏财网';
    });
  });
