'use strict';
angular.module('hongcaiApp')
  .controller('GuaranteeproListCtrl', function($scope, $stateParams, $rootScope, $location, $state, ProjectService, CreditService, toaster, ProjectUtils, DateUtils, projectStatusMap) {
    
    $scope.sortType = $stateParams.sortType || false;
    $scope.showFlag = $stateParams.showFlag || 0;
    $scope.projectStatusMap = projectStatusMap;
    $scope.pageSize = 6;
    var userId = $rootScope.loginUser ? $rootScope.loginUser.id : null;

    if ($scope.sortType === 'true') {
      $scope.sortType = true;
    } else {
      $scope.sortType = false;
    }
    $scope.toggleSort = function() {
      $scope.sortType = !$scope.sortType;
    };

    function isEmptyObject(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    }

    $scope.type = $stateParams.type ? $stateParams.type : '5';
    if (!$stateParams.projectDays) {
      $location.path('/guaranteepro-list/7,8,9,10,11,12/0_1000/0_100/0_1000/release_start_time/false/' + $scope.type);
      return;
    }


    if($scope.type == '5'){
      $rootScope.pageTitle = '宏财精选 - 宏财网';
      $scope.typeName = '宏财精选';
      $scope.searchCycle = [
        { value: '0_1000', name: '全部' },
        { value: '1_30', name: '30天以下'},
        { value: '31_90', name: '31 - 90天'},
        { value: '91_1000', name: '91天以上'}
      ];

      $scope.searchAnnualEarings = [
        { value: '0_100', name: '全部' },
        { value: '0_7', name: '7%以下'},
        { value: '7_9', name: '7 - 9%'},
        { value: '9_100', name: '9%以上'}
      ];

      $scope.searchTotals = [
        { value: '0_1000', name: '全部' },
        { value: '0_20', name: '20万以下'},
        { value: '20_50', name: '20 - 50万'},
        { value: '50_100', name: '50 - 100万'},
        { value: '100_1000', name: '100万以上'}
      ];
          
    } else {
      $rootScope.pageTitle = '宏财尊贵 - 宏财网';
      $scope.typeName = '宏财尊贵';
      $scope.searchCycle = [
        { value: '0_1000', name: '全部' },
        { value: '1_270', name: '270天以下'},
        { value: '271_360', name: '271 - 360天'},
        { value: '361_1000', name: '361天以上'}
      ];

      $scope.searchAnnualEarings = [
        { value: '0_100', name: '全部' },
        { value: '0_9', name: '9%以下'},
        { value: '9_11', name: '9 - 11%'},
        { value: '11_100', name: '11%以上'}
      ];

      $scope.searchTotals = [
        { value: '0_1000', name: '全部' },
        { value: '0_20', name: '20万以下'},
        { value: '20_50', name: '20 - 50万'},
        { value: '50_100', name: '50 - 100万'},
        { value: '100_1000', name: '100万以上'}
      ];
    }

    $scope.sortCondition = $stateParams.sortCondition;
    $scope.status = $stateParams.status;
    $scope.projectDays = $stateParams.projectDays;
    $scope.earning = $stateParams.earning;
    $scope.total = $stateParams.total;

    var newbieProject = function (page, pageSize) {
      ProjectService.newbieProject.get({}, function (response) {
        if (!response || response.ret === -1) {
          return
        }
        $scope.newbieProject = response
        $scope.newBieNum = response.number
        // 查询用户是否投资过
        $scope.newBieNum && $rootScope.isLogged && ProjectService.isExist.get({
          userId: userId
        }, function (response) {
          if (!response || response.ret === -1) {
            return
          }
          $scope.isExist = response.exist;
          if ($rootScope.isLogged) {
            // 查询新手标是否授权
            ProjectService.authorization.get({
              number: $scope.newBieNum
            }, function (response) {
              if (!response || response.ret === -1) {
                return
              }
              $scope.authorization = response.authorization
              // $scope.authorization = true
            })
          }
        })
      })
    }
    newbieProject()

    /**
     * 宏财精选、尊贵列表
     */
    $scope.getProjectList = function(page, pageSize) {
      $scope.currentPage = page;
      $scope.showFlag = 1;
      ProjectService.projectList.get({
        status: $stateParams.status,
        projectDays: $stateParams.projectDays,
        earning: $stateParams.earning,
        total: $stateParams.total,
        sortCondition: $stateParams.sortCondition,
        sortType: $scope.sortType,
        type: $scope.type,
        page: page,
        pageSize: pageSize
      }, function(response) {
        if (response.ret !== 1) {
          $scope.data = [];
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          return;
        }
        $scope.serverTime = response.data.serverTime;
        $scope.projectList = response.data.projectList;
        $scope.repaymentTypeMap = response.data.repaymentTypeMap;
        $scope.pageCount = response.data.pageCount;
        $scope.orderProp = 'id';
        $scope.data = [];
        $scope.numberOfPages = function() {
          return $scope.pageCount;
        }
        for (var i = 0; i < $scope.projectList.length; i++) {
          $scope.projectList[i].progress = ($scope.projectList[i].total - $scope.projectList[i].amount) / $scope.projectList[i].total * 100;
          $scope.projectList[i].showByStatus = $scope.projectList[i].status === 6 || $scope.projectList[i].status === 7 ? true : false;
          ProjectUtils.projectTimedown($scope.projectList[i],$scope.serverTime);
          $scope.data.push($scope.projectList[i]);
        }
      });
    };


    $scope.page = function(page) {
      if ($scope.currentPage !== page) {
        $scope.getProjectList(page, $scope.pageSize);
      }
    }
    $scope.getProjectList(1, $scope.pageSize);
  })

.directive('projectPagination', function() {
  return {
    restrict: 'AE',
    templateUrl: 'views/partials/_pagination.html'
  };
});
