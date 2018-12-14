'use strict';
angular.module('hongcaiApp')
  .controller('ActiveEmailCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'RegisterService', 'DEFAULT_DOMAIN', 'toaster', function($scope, $state, $rootScope, $stateParams, RegisterService, DEFAULT_DOMAIN, toaster) {
    if ($stateParams.etoken) {
      RegisterService.activeEmail.get({
        etoken: $stateParams.etoken
      }, function(response) {
        if (response.ret === 1) {
          //console.log('active success');
        } else {
          toaster.pop('warning', '提示', response.msg);
        }
      });
    }
  }]);
