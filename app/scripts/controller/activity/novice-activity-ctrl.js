/*
 * @Author: yuyang
 * @Date:   2016-07-28 14:32:02
 * @Last Modified by:  
 * @Last Modified time: 
 */

'use strict';
angular.module('hongcaiApp')
  .controller('NoviceActivityCtrl', function($rootScope, $state, $scope, ProjectService) {
	
	/* 新手标*/
    ProjectService.newbieBiaoProject.get({}, function(response) {
      if (response.ret === -1) {
        return;
      }
	  $scope.newbieBiaoProject = response;
	  $scope.newbieBiaoProject.soldStock = response.soldStock;
	  $scope.newbieBiaoProject.occupancyStock = response.occupancyStock;
	  $scope.newbieBiaoProject.countInvest = response.countInvest;
	  $scope.progress = ($scope.newbieBiaoProject.soldStock + $scope.newbieBiaoProject.occupancyStock) * 100 / $scope.newbieBiaoProject.countInvest;
	})

	
	//跳转注册页 || 宏金保列表页
    $scope.goTake = function(){
		if($rootScope.isLogged){
			$state.go('root.guaranteepro-list-query-no');
		}else {
			$state.go('root.register');
		}
    }

  });
