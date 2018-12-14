'use strict';
angular.module('hongcaiApp')
  .controller('FriendLinkCtrl', ['$scope', '$state', 'FriendLinkService', '$alert', '$timeout', function($scope, $state, FriendLinkService, $alert, $timeout) {

    FriendLinkService.friendLinkList.get(function(response) {
      if (response.ret === 1) {
        $scope.friendLinks = response.data.friendLinks;
      } else {
        $scope.msg = response.msg;
        $alert({
          scope: $scope,
          template: 'views/modal/alert-dialog.html',
          show: true
        });
      }
    });


  }]);
