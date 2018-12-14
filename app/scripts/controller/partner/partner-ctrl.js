'use strict';
angular.module('hongcaiApp')
  .controller('PartnerCtrl', ['$scope', '$state', '$rootScope', '$stateParams', '$location', function($scope, $state, $rootScope, $stateParams, $location) {
    $scope.menus = {
      'left': [{
        'href': '/partner-platform',
        'link': 'root.partner.partner-platform',
        'text': '甘肃担保'
      }, {
        'href': '/partner-zhongdong',
        'link': 'root.partner.partner-zhongdong',
        'text': '中东担保'
      }, {
        'href': '/partner-jilian',
        'link': 'root.partner.partner-jilian',
        'text': '吉联担保'
      }, {
        'href': '/partner-jibei',
        'link': 'root.partner.partner-jibei',
        'text': '吉林北方'
      }, {
        'href': '/partner-yeepay',
        'link': 'root.partner.partner-yeepay',
        'text': '易宝支付'
      }, {
        'href': '/partner-tianchang',
        'link': 'root.partner.partner-tianchang',
        'text': '天畅律所'
      }, {
        'href': '/partner-hexing',
        'link': 'root.partner.partner-hexing',
        'text': '和兴会所'
      }]
    };
    $rootScope.selectPage = $location.path().split('/')[1];
  }]);
