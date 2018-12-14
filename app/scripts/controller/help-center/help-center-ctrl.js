'use strict';
angular.module('hongcaiApp')
  .controller('HelpCenterCtrl', ['$scope', '$state', '$rootScope', '$location', function($scope, $state, $rootScope, $location) {
    var path = $location.path();
    if (path.indexOf('introduce') !== -1){
        $rootScope.pageTitle = '了解宏财' + ' - 宏财网';
    } else if (path.indexOf('introduction-of-platform') !== -1){
        $rootScope.pageTitle = '宏财简介' + ' - 宏财网';
    } else if (path.indexOf('consultant-team') !== -1){
        $rootScope.pageTitle = '顾问团队' + ' - 宏财网';
    } else if (path.indexOf('hongcai-trends') !== -1){
        $rootScope.pageTitle = '宏财动态' + ' - 宏财网';
    } else if (path.indexOf('company-profile') !== -1){
        $rootScope.pageTitle = '加入宏财' + ' - 宏财网';
    } else if (path.indexOf('investment') !== -1){
        $rootScope.pageTitle = '出借相关' + ' - 宏财网';
    } else if (path.indexOf('investors') !== -1){
        $rootScope.pageTitle = '项目介绍' + ' - 宏财网';
    } else if (path.indexOf('recharge-and-withdrawals') !== -1){
        $rootScope.pageTitle = '充值提现' + ' - 宏财网';
    } else if (path.indexOf('account-management') !== -1){
        $rootScope.pageTitle = '账户管理' + ' - 宏财网';
    } else if (path.indexOf('safety-certification') !== -1){
        $rootScope.pageTitle = '注册认证' + ' - 宏财网';
    } else if (path.indexOf('user-welfare') !== -1){
        $rootScope.pageTitle = '用户福利' + ' - 宏财网';
    } else if (path.indexOf('customer-service') !== -1){
        $rootScope.pageTitle = '客户服务' + ' - 宏财网';
    } else if (path.indexOf('projecter') !== -1){
      $rootScope.pageTitle = '项目方介绍' + ' - 宏财网';
    } else if (path.indexOf('platform') !== -1){
      $rootScope.pageTitle = '平台介绍' + ' - 宏财网';
    } else if (path.indexOf('link-us') !== -1){
      $rootScope.pageTitle = '联系我们' + ' - 宏财网';
    } else if (path.indexOf('law-and-policy-guarantee') !== -1){
      $rootScope.pageTitle = '法律保护' + ' - 宏财网';
    }

    

    
    $scope.menus = {
      'left': [{
        'href': '/introduce',
        'link': 'root.help-center.introduce',
        'text': '了解宏财'
      }, {
        'href': '/investors',
        'link': 'root.help-center.investors',
        'text': '项目介绍'
      }, {
        'href': '/investment',
        'link': 'root.help-center.investment',
        'text': '出借相关'
      }, {
        'href': '/safety-certification',
        'link': 'root.help-center.safety-certification',
        'text': '注册认证'
      }, {
        'href': '/account-management',
        'link': 'root.help-center.account-management',
        'text': '账户管理'
      }, {
        'href': '/recharge-and-withdrawals',
        'link': 'root.help-center.recharge-and-withdrawals',
        'text': '充值提现'
      }, {
        'href': '/user-welfare',
        'link': 'root.help-center.user-welfare',
        'text': '用户福利'
      }, {
        'href': '/customer-service',
        'link': 'root.help-center.customer-service',
        'text': '客户服务'
      }, {
        'href': '/law-and-policy-guarantee',
        'link': 'root.help-center.law-and-policy-guarantee',
        'text': '法律保护'
      }]
    };
    $scope.events = [
      {
        time: '2014年12月',
        event: '正式上线运营'
      },
      {
        time: '2014年12月',
        event: '董事长刘刚担任首都经贸大学MBA导师'
      },
      {
        time: '2015年06月',
        event: '董事长刘刚博士荣登《当代经理人》杂志封面人物'
      },
      {
        time: '2015年09月',
        event: '被评为人民网2015全国“中小企业服务体系创新典型案例”'
      },
      {
        time: '2016年03月',
        event: '成为中国中小企业协会会员'
      },
      {
        time: '2016年03月',
        event: '入驻中国中小企业信息网（www.sme.gov.cn）首页'
      },
      {
        time: '2016年05月',
        event: '获得A轮战略投资'
      },
      {
        time: '2016年10月',
        event: '首批接入北京金融局、北京网贷行业协会发起的“北京网贷存管通”平台的互金企业'
      },
      {
        time: '2016年11月',
        event: '正式加入北京网贷行业协会，与投哪网、微贷网等互金平台同时获得观察员身份'
      },
      {
        time: '2017年03月',
        event: '荣获“2016年度中国互联网放心网站”称号'
      },
      {
        time: '2017年03月',
        event: '荣获“2016年度中国互联网金融行业优秀示范企业”称号'
      },
      {
        time: '2017年04月',
        event: '与海口联合农商银行正式签订银行存管协议'
      },
      {
        time: '2017年06月',
        event: '银行资金存管系统正式上线，进入新的发展期'
      },
      {
        time: '2017年12月',
        event: '荣登第七批中关村“金种子企业”名单'
      }
    ]

    $rootScope.selectPage = $location.path().split('/')[1];
    
    $scope.showOrHide = function (e) {
      if (e.target.nextElementSibling.style.display !== 'block') {
        e.target.firstElementChild.className += ' open';
        e.target.nextElementSibling.style.display = 'block';
      } else {
        e.target.firstElementChild.classList.remove('open');
        e.target.nextElementSibling.style.display = 'none';
      }
    }

    $scope.risk = [
      {
        name: '产品安全等级',
        level: ['A级', 'B级', 'C级', 'D级']
      },
      {
        name: '安全等级含义',
        level: ['优质项目，征信良好，收入稳定，资产实力强，还款能力强。', '征信良好，收入稳定，资产实力尚可，还款能力较强。 ', '征信良好，收入相对稳定，资产能覆盖债务，营收有小幅度的波动，有一定的还款能力。', '征信有过逾期，但尚未达不良程度，或负债相对较高但资产能够覆盖债务，还款能力可能有一定幅度的波动 。']
      }
    ]
  }]);
