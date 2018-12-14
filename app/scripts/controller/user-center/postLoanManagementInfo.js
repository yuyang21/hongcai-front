'use strict';
angular.module('hongcaiApp')
  .controller('postLoanManagementInfoCtrl', ['$scope', '$stateParams', 'ProjectService', 'AboutUsService', function($scope, $stateParams, ProjectService, AboutUsService) {
    $scope.projectDays = 0
    $scope.msg = ''
    $scope.getProject =  function () {
      ProjectService.prejectDetail.get({
        number: $stateParams.number
      }, function (response) {
        $scope.projectDays = response.projectDays
        var projectId = response.id
        AboutUsService.loanInfo.get({
          id: projectId
        }, function (res) {
          if (res && res.id != undefined) {
            var dataMsg = res.objContent
            $scope.disclosureTime = res.createTime
            $scope.postLoanMsg = [
              {
                name: '借款资金使用情况',
                content: dataMsg.loanUsedInfo
              },
              {
                name: '经营情况',
                content: dataMsg.manageInfo
              },
              {
                name: '财务情况',
                content: dataMsg.financeInfo
              },
              {
                name: '还款能力变化情况',
                content: dataMsg.repaymentInfo
              },
              {
                name: '逾期情况',
                content: dataMsg.overdueInfo
              },
              {
                name: '涉诉情况',
                content: dataMsg.lawsuitInfo
              },
              {
                name: '受行政处罚情况',
                content: dataMsg.penaltyInfo
              },
              {
                name: '其他可能影响借款人还款的重大事件',
                content: dataMsg.eventInfo
              }
            ]
          } else {
            $scope.projectDays <= 180 ? $scope.msg = '该借款项目将于每月前5个工作日向您披露相关贷后管理信息。' : $scope.msg = '该借款项目将于每季度前5个工作日向您披露相关贷后管理信息。'
          }
        })
      })
    }
    $scope.getProject()
  }])