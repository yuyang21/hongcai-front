'use strict';
angular.module('hongcaiApp')
  .controller('CreditVerifyCtrl', ['$scope', '$location', '$state', '$rootScope', '$stateParams', '$modal', 'OrderService', 'SessionService', 'config', function($scope, $location, $state, $rootScope, $stateParams, $modal, OrderService, SessionService, config) {
    // $scope.giftCount = 0;
    // $scope.checkInvFlag = true;
    // OrderService.investVerify.get({
    //   projectId: $stateParams.projectId,
    //   amount: $stateParams.amount,
    // }, function(response) {
    //   if (response.ret === 1) {
    //     $scope.project = response.data.project;
    //     $scope.capital = response.data.capital;
    //     $scope.categoryCode = response.data.categoryCode;
    //     $scope.giftCount = response.data.giftCount;
    //     $scope.investAmount = $stateParams.amount;
    //     $scope.icons = [];
    //     for (var i = 0; i <= $scope.giftCount; i++) {
    //       var obj = {};
    //       obj.value = '' + i + '';
    //       obj.label = '' + i + '';
    //       $scope.icons.push(obj);
    //     }
    //   } else if (response.ret === -1) {
    //     if (response.code === 1) {
    //       alert('已经卖光啦！');
    //     } else {
    //       alert(response.msg);
    //     }
    //     $location.path('project-list/6,7,8,9/0/100/0/100/0/200000000/release_start_time/false');
    //   }

    // });

    // function newForm() {
    //   var f = document.createElement('form');
    //   document.body.appendChild(f);
    //   f.method = 'post';
    //   return f;
    // }

    // function createElements(eForm, eName, eValue) {
    //   var e = document.createElement('input');
    //   eForm.appendChild(e);
    //   e.type = 'text';
    //   e.name = eName;
    //   if (!document.all) {
    //     e.style.display = 'none';
    //   } else {
    //     e.style.display = 'block';
    //     e.style.width = '0px';
    //     e.style.height = '0px';
    //   }
    //   e.value = eValue;
    //   return e;
    // }

    // $scope.transfer = function(project, investAmount, giftCount) {
    //   OrderService.saveOrder.get({
    //     projectId: project.id,
    //     investAmount: investAmount,
    //     giftCount: giftCount,
    //     inviteMobile: $rootScope.inviteMobile
    //   }, function(response) {
    //     if (response.ret === 1) {
    //       var orderId = response.data.orderId;
    //       OrderService.transfer.get({
    //         projectId: project.id,
    //         orderId: orderId
    //       }, function(response) {
    //         if (response.ret === 1) {
    //           var req = response.data.req;
    //           var sign = response.data.sign;
    //           var _f = newForm(); //创建一个form表单
    //           createElements(_f, 'req', req); //创建form中的input对象
    //           createElements(_f, 'sign', sign);
    //           _f.action = config.YEEPAY_ADDRESS + 'toTransfer'; //form提交地址
    //           _f.submit(); //提交
    //         }
    //       });
    //     }
    //   });
    // };

    // var myOtherModal = $modal({
    //   scope: $scope,
    //   template: 'views/modal/modal-invest-verify.html',
    //   show: false
    // });
    // $scope.showModal = function() {
    //   myOtherModal.$promise.then(myOtherModal.show);
    // };

    // $scope.changeInvestAmount = function(investAmount) {
    //   $location.path('/invest-verify/' + $stateParams.projectId + '/' + investAmount);
    // };
    // $scope.backTo = function() {
    //   $location.path('/project/' + $stateParams.projectId);
    // };
    // $scope.selectedIcon = 1;
  }]);
