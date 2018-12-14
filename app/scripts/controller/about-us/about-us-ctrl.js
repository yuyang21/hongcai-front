'use strict';
angular.module('hongcaiApp')
  .controller('AboutUsCtrl', ['$scope', '$state', '$rootScope', '$location', function($scope, $state, $rootScope, $location) {
    $scope.menus = {
      'left': [/*{
        'href': '/introduction-of-platform',
        'link': 'root.about-us.introduction-of-platform',
        'text': '宏财简介'
      }, {
        'href': '/consultant-team',
        'link': 'root.about-us.consultant-team',
        'text': '顾问团队'
      }{
        'href': '/us/projecter',
        'link': 'root.us.projecter',
        'text': '项目方介绍'
      }, */{
        'href': '/us/platform',
        'link': 'root.us.platform',
        'text': '平台介绍'
      }, {
        'href': '/us/web-site-notice',
        'link': 'root.us.web-site-notice',
        'text': '网站公告'
      }, {
        'href': '/us/media-reports',
        'link': 'root.us.media-reports',
        'text': '媒体报道'
      }, {
        'href': '/us/hongcai-trends',
        'link': 'root.us.hongcai-trends',
        'text': '宏财动态'
      }, {
        'href': '/us/company-profile',
        'link': 'root.us.company-profile',
        'text': '加入宏财'
      }, {
        'href': '/us/link-us',
        'link': 'root.us.link-us',
        'text': '联系我们'
      }]
    };

    $rootScope.selectPage = $location.path().split('/')[1];
  }]);
