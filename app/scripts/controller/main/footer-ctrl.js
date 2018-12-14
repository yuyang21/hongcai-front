'use strict';
angular.module('hongcaiApp')
  .controller('FooterCtrl', ['$scope', '$alert', function($scope, $alert) {

    $alert({
      scope: $scope,
      template: 'views/modal/alert-announcement.html',
      show: true
    });

  }]);
