'use strict';
angular.module('hongcaiApp')
  .controller('SysUpdateCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, $interval, DEFAULT_DOMAIN) {

    $scope.reload = function () {
      $state.reload();
    }

   // var interval = $interval(function(){
   //    $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession').success(function(response){
   //      if($stateParams.return){
   //        $location.path($stateParams.return);
   //      } else {
   //        $state.go('root.main');
   //      }
   //    });
   //  }, 1000);

    /**
     * 注意清除这个轮训，否则会一直轮训下去
     */
    // $scope.$on('$stateChangeStart', function() {
      // $interval.cancel(interval);
    // });

  });
