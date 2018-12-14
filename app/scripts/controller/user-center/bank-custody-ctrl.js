'use strict';
angular.module('hongcaiApp')
  .controller('BankCustodyCtrl', function($scope, $state, $rootScope, $location) {
   
    $scope.toProcess = function () {
      if(!$rootScope.isLogged){
        $state.go('root.login', {
          redirectUrl: $location.path()
        });
        return;
      }
      if($rootScope.realNameAuthState === 1 && !$rootScope.isActive) {
        $state.go("root.recharge-transfer", {amount:0, business: 'ACTIVE'});
      } else if($rootScope.realNameAuthState == 0) {
        $rootScope.toRealNameAuth();
      }
    } 

  });
