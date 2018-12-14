'use strict';
angular.module('hongcaiApp')
  .controller('AssetsOverviewCtrl', function($scope, $state, $rootScope, $stateParams, UserCenterService) {

     $scope.onClick = function (points, evt) {
      //console.log(points, evt);
     };

    $scope.options = {
      bezierCurve: false,
      // scaleGridLineWidth:1,
      scaleShowVerticalLines: false,
      numberPrefix: "$",
    }

    UserCenterService.getUserAccount.get(function(response) {
      if (response.ret === 1) {
        var account = response.data.account;
        $scope.account = response.data.account;

      } else {
        //console.log('ask assets-overview, why getUserAccount did not load data...');
        $state.go('root.login');
      }
    });


    /**
     * 收益曲线
     */
    UserCenterService.dayProfit.get(function(response){
      var creditRightList = response.data.creditRightList;
      $scope.labels = [];
      var datas = [];

      for(var i = 0; i <= creditRightList.length - 1; i++){
        var date = new Date(creditRightList[i].createTime);
        $scope.labels.push((date.getMonth() + 1) + '-' + date.getDate());
        datas.push(creditRightList[i].profit);
      }

      $scope.data = [];
      $scope.data.push(datas);
    });

  });
