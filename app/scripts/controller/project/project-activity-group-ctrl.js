'use strict';
angular.module('hongcaiApp')
  .controller('ProjectActivityGroupCtrl', ['$scope', 'ProjectService', 'toaster', function ($scope, ProjectService, toaster) {
    $scope.valCategory = {6:'预发布', 7: '立即出借', 8: '查看详情', 9:'查看详情', 10:'查看详情'};
    var activityGroup = ProjectService.getGiftProjectList.get(function() {
      if(activityGroup.ret === 1) {
        $scope.projectList = activityGroup.data.projectList;
        /*for(var i=0;i<projectList.length;i++){
          $scope.projectList.status= 6;
        }*/
      } else {
        $scope.projectList = [];
        toaster.pop('warning', '服务器正在努力的加载....请稍等。');
      }
    });
  }]);
