'use strict';
angular.module('hongcaiApp')
  .controller('ProjectCategoryCtrl', ['$scope','$rootScope', '$location', function ($scope, $rootScope, $location) {
    $rootScope.selectPage = $location.path().split('/')[1];
    // $scope.projectTitle = '宏财网 - 产品介绍';
    // $scope.projectCategory = [{'title':'投资项目',
    //   'content':'平台提供优质担保机构（信用评级A级以上，政府重点扶持的担保机构）担保的项目标，所有项目要求抵押物必须足值，用户根据审核后的信息，自选合适的借款标的，构建符合个人意愿的投资组合。',
    //   'tips':['项目回报率10% - 18%','期限灵活1-12个月','100元起投，可小额多笔投资，分散风险','100%本息保障'],
    //   'url': "root.project-list-query({status: '6,7,8,9,10', minCycle: 0, maxCycle: 100, minEarning: 0, maxEarning: 100, minTotalAmount: 0, maxTotalAmount: 200000000, sortCondition:'release_start_time', sortType: false })"},
    //  {'title':'宏运当头标',
    //   'content':'宏财网发起的宏宝投资（不可使用现金）活动，活动时间为2014年12月1日——2015年1月31日，每日0点发布宏运当头标并截止昨日宏运当头标的投资。',
    //   'tips':['项目回报率10% - 90%','期限灵活3天','0元起投，每位用户最多使用10张宏包投资','到期返息，可投资，可取现'],
    //   'url': 'root.project-activity-group'
    // }];
  }]);

