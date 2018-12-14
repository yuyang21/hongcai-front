/*
 * @Author: hongcai
 * @Date:   2016-07-26 15:32:02
 * @Last Modified by:   fuqiang1
 * @Last Modified time: 2016-09-13 14:55:13
 */

'use strict';
angular.module('hongcaiApp')
  .controller('CashCouponCtrl', function(ipCookie, $scope, $state, $rootScope, $stateParams, UserCenterService) {
    $scope.datas = [];
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.total = 1;
    $scope.usedStatus = '1';
    /*
     * 投资统计
     */
    $scope.getUserCashCoupons = function() {
      UserCenterService.getUserCashCouponsStat.get(function(response) {
        if (!response || response.ret === -1) {
          return;
        }
        $scope.gotAmount = response.gotAmount;
        $scope.unGotAmount = response.unGotAmount;
      });
    }
    $scope.getUserCashCoupons();
    /*
     *查看现金券
     */
    $scope.userCashCoupons = function(page, pageSize, status) {
      
      $scope.usedStatus = status;
      UserCenterService.userCashCoupons.get({
        page: page,
        pageSize: pageSize,
        status: status
      }, function(response) {
        if (!response || response.ret === -1) {
          return;
        }
        $scope.CashCoupons = response.data;
        $scope.datas = response.data;
        $scope.currentPage = page;
        $scope.pageSize = pageSize;
        $scope.total = response.total;
        $scope.totalPage = response.totalPage;
        $scope.usedStatus = status;
      });
    };
    $scope.userCashCoupons($scope.currentPage,$scope.pageSize,'1');

    $scope.toProjectList = function(investProductType, $index){
      if (investProductType == 5) {
        $state.go('root.guaranteepro-list-query-no',{type: 5});
      }else if (investProductType == 6) {
        $state.go('root.guaranteepro-list-query-no',{type: 6});
      }else {
        $state.go('root.guaranteepro-list-query-no');
      }
      ipCookie('cashNum', $scope.CashCoupons[$index].number);
      ipCookie('cashType', $scope.CashCoupons[$index].type);
    }

  });
