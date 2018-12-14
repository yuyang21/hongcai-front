'use strict';
angular.module('hongcaiApp')
  .controller('SuningSuccessCtrl', ['$scope', '$rootScope','$stateParams',function ($scope,$rootScope,$stateParams) {
     //console.log($stateParams);
     if($stateParams.SuccessStatus == 1){
     	$scope.sMessage = "您已成功登录宏财！";
     }else if($stateParams.SuccessStatus == 2){
     	$scope.sMessage = "恭喜您成功注册宏财！";
     }
  }]);
