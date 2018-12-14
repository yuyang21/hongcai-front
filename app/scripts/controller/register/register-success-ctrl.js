'use strict';
angular.module('hongcaiApp')
  .controller('RegisterSuccessCtrl', ['$scope', '$timeout', '$state', '$rootScope', '$stateParams', 'RegisterService', function($scope, $timeout, $state, $rootScope, $stateParams, RegisterService) {
    $scope.message = '注册成功';
    var etoken = $stateParams.etoken;
    if (etoken) {
      RegisterService.activeEmail.get({
        etoken: etoken
      }, function(response) {
        if (response.ret === -1) {
          $scope.message = response.msg;
        }
      });
    }
  }]);
