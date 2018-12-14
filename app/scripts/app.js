'use strict';
/**
 * @ngdoc overview
 * @name hongcaiApp
 * @description
 * #
 * 宏财JS库依赖以及程序路由主配置文件
 */

var hongcaiApp = angular.module('hongcaiApp', [
  'ngAnimate',
  'ngSanitize',
  'mgcrea.ngStrap',
  'ui.router',
  'ui.slider',
  'ngResource',
  'angularMoment',
  'toaster',
  'chart.js',
  'placeholders',
  'angular-loading-bar',
  'bardo.directives',
  'config',
  'sticky',
  'ipCookie',
  'angular-md5',
  'textAngular',
  // 'angular-google-analytics',
  'bgf.paginateAnything',
  'angular-svg-round-progress',
  'seo',
  'ng-echarts',
  'angularFileUpload',
  'exceptionOverwrite'
]);

hongcaiApp
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$uiViewScrollProvider', '$httpProvider', '$sceDelegateProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider, $httpProvider, $sceDelegateProvider) {
    $uiViewScrollProvider.useAnchorScroll();

    var $http, interceptor = ['$q', '$injector', function($q, $injector) {
      var error;

      function success(response) {
        $http = $http || $injector.get('$http');
        var $timeout = $injector.get('$timeout');
        var $rootScope = $injector.get('$rootScope');
        if ($http.pendingRequests.length < 1) {
          $timeout(function() {
            if ($http.pendingRequests.length < 1) {
              $rootScope.htmlReady();
            }
          }, 700); //an 0.7 seconds safety interval, if there are no requests for 0.7 seconds, it means that the app is through rendering
        }
        return response;
      }

      function error(response) {
        $http = $http || $injector.get('$http');

        return $q.reject(response);
      }

      return function(promise) {
        return promise.then(success, error);
      }
    }];

    $httpProvider.responseInterceptors.push(interceptor);

    $stateProvider
      .state('root', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'views/root.html'
          },
          'header': {
            templateUrl: 'views/header.html',
            controller: 'LoginCtrl',
            controllerUrl: 'scripts/controller/user-center/login-ctrl'
          },
          'footer': {
            templateUrl: 'views/footer.html'
              /*,
                          controller: 'FooterCtrl',
                          controllerUrl: 'scripts/controller/main/footer-ctrl'*/
          },
          'service': {
            templateUrl: 'views/service.html',
            controller: 'ServiceCtrl',
            controllerUrl: 'scripts/controller/main/service-ctrl'
          }
        }
      })
      .state('root.main', {
        url: '/',
        views: {
          '': {
            //templateUrl: 'views/main.html',
            templateUrl: 'views/main-new.html',
            controller: 'MainCtrl',
            controllerUrl: 'scripts/controller/main/main-ctrl'
          },
          'slider': {
            templateUrl: 'views/slider.html',
            controller: 'SliderCtrl',
            controllerUrl: 'scripts/controller/main/slider-ctrl'
          },
          /*'sponsor': {
        templateUrl: 'views/project/project-sponsor-list.html',
        controller: 'GuaranteeListCtrl',
        controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
      }*/
        }
      })
      .state('root.mainRedirect', {
        url: '/third/:f',
        views: {
          '': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerUrl: 'scripts/controller/main/main-ctrl'
          },
          'slider': {
            templateUrl: 'views/slider.html',
            controller: 'SliderCtrl',
            controllerUrl: 'scripts/controller/main/slider-ctrl'
          },
          /*'sponsor': {
            templateUrl: 'views/project/project-sponsor-list.html',
            controller: 'GuaranteeListCtrl',
            controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
          }*/
        }
      })
      .state('root.login', {
        url: '/login?redirectUrl',
        views: {
          '': {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerUrl: 'scripts/controller/user-center/login-ctrl'
          }
        },
        data: {
          title: '登录'
        }
      })
      /**
       * 平台用户的登陆入口
       */
      .state('root.pLogin', {
        url: '/p',
        views: {
          '': {
            templateUrl: 'views/p-login.html',
            controller: 'LoginCtrl',
            controllerUrl: 'scripts/controller/user-center/login-ctrl'
          }
        }
      })
      /**
       * 注册改版
       * @type {String}
       */
      .state('root.register',{
        url: '/register?inviteCode',
        views:{
          '':{
            templateUrl:'views/register/register.html',
            controller: 'RegisterMobileCtrl',
            controllerUrl: 'scripts/controller/register/register-mobile-ctrl'
          }
        }
      })
      .state('root.register-bind',{
        url: '/register-bind',
        views:{
          '':{
            templateUrl:'views/register/register-bind.html',
            controller: 'SecuritySettingsCtrl',
            controllerUrl: 'scripts/controller/user-center/security-settings-ctrl'
          }
        }
      })


      .state('root.registerMobile', {
        url: '/register-mobile/:inviteCode',
        views: {
          '': {
            templateUrl: 'views/register/register-mobile.html',
            controller: 'RegisterMobileCtrl',
            controllerUrl: 'scripts/controller/register/register-mobile-ctrl'
          }
        }
      })
      .state('root.registerMail', {
        url: '/register-mail/:inviteCode',
        views: {
          '': {
            templateUrl: 'views/register/register-mail.html',
            controller: 'RegisterMailCtrl',
            controllerUrl: 'scripts/controller/register/register-mail-ctrl'
          }
        }
      })
      .state('root.newbie-guide', {
        url: '/newbie-guide',
        views: {
          '': {
            templateUrl: 'newbie-guide.html',
            controller: 'RegisterMailCtrl',
            controllerUrl: 'scripts/controller/register/register-mail-ctrl'
          }
        }
      })
      .state('root.nofound-page', {
        url: '/nofound-page',
        views: {
          '': {
            templateUrl: 'views/nofound-page.html',
            controller: 'NoFoundCtrl',
            controllerUrl: 'scripts/controller/register/no-found-ctrl'
          }
        }
      })
      /*----------------------  banner  -------------------------*/
      .state('root.banner-fourty', {
        url: '/banner-fourty',
        views: {
          '': {
            templateUrl: 'views/banner/banner-fourty.html'
          }
        }
      })
      .state('root.banner-nine', {
        url: '/banner-nine',
        views: {
          '': {
            templateUrl: 'views/banner/banner-nine.html'
          }
        }
      })
      .state('root.banner-P2B', {
        url: '/banner-P2B',
        views: {
          '': {
            templateUrl: 'views/banner/banner-P2B.html'
          }
        }
      })
       /*----------------------  了解存管  -------------------------*/
      .state('root.sign-bank-deposits', {
        url: '/sign-bank-deposits',
        views: {
          '': {
            templateUrl: 'views/sign-bank-deposits.html'
          }
        },
        data: {
          title: '了解存管'
        }
      })

      /**
       * 宏金盈介绍页
       * @type {String}
       */
      .state('root.banner-investmentplan', {
        url: '/banner-investmentplan',
        views: {
          '': {
            templateUrl: 'views/banner/banner-investmentplan.html',
            controller: 'BannerInvPlanCtrl',
            controllerUrl: 'scripts/controller/main/banner-investmentplan-ctrl'
          }
        }
      })
      .state('root.banner-investmentplan-div', {
        url: '/banner-investmentplan/:anchor',
        views: {
          '': {
            templateUrl: 'views/banner/banner-investmentplan.html',
            controller: 'BannerInvPlanCtrl',
            controllerUrl: 'scripts/controller/main/banner-investmentplan-ctrl'
          }
        }
      })
      .state('root.banner-partner', {
        url: '/banner-partner',
        views: {
          '': {
            templateUrl: 'views/banner/banner-partner.html'
          }
        }
      })
      .state('root.friends-ship', {
        url: '/friends',
        views: {
          '': {
            templateUrl: 'views/banner/friends-ship.html',
            controller: 'FriendLinkCtrl',
            controllerUrl: 'scripts/controller/banner/friend-link-ctrl'
          }
        }
      })
      .state('root.send-email', {
        url: '/send-email-success',
        views: {
          '': {
            templateUrl: 'views/register/send-email.html'
          }
        }
      })
      .state('root.active-email', {
        url: '/active-email?etoken',
        views: {
          '': {
            templateUrl: 'views/register/active-email.html',
            controller: 'ActiveEmailCtrl',
            controllerUrl: 'scripts/controller/register/active-email-ctrl'
          }
        }
      })
      .state('root.register-success', {
        url: '/register-success/:etoken',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'RegisterSuccessCtrl',
            controllerUrl: 'scripts/controller/register/register-success-ctrl'
          }
        }
      })
      .state('root.register-mobile-success', {
        url: '/register-mobile-success',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'RegisterMobileSuccessCtrl',
            controllerUrl: 'scripts/controller/register/register-mobile-success-ctrl'
          }
        }
      })

    /**
     * 易宝网页操作回调页，包括开通易宝、充值、提现、绑卡、取消绑卡、投资
     * @type {String}
     */
    .state('root.yeepay-callback', {
      url: '/yeepay-callback/:business/:status?amount&number&profit',
      views: {
        '': {
          templateUrl: 'views/success.html',
          controller: 'YeepaySuccessCtrl',
          controllerUrl: 'scripts/controller/user-center/yeepay-success-ctrl'
        }
      }
    })

    /*-------------  toYeepay transfer --------------------*/
    .state('root.recharge-transfer', {
        url: '/recharge-transfer/:amount/:rechargeWay/:expectPayCompany?business',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'RechargeTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/recharge-transfer-ctrl'
          }
        }
      })

       /**
       * 开通易宝，即实名认证
       */
      .state('root.rights-transfer', {
        url: '/righs-transfer/:realName/:idCardNo/:type',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'RightsTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/rights-transfer-ctrl'
          }
        }
      })
      .state('root.withdraw-transfer', {
        url: '/withdraw-transfer/:amount/:captcha',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'WithdrawTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/withdraw-transfer-ctrl'
          }
        }
      })
      .state('root.bankcard-transfer', {
        url: '/bankcard-transfer/:type',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'BankcardTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/bankcard-transfer-ctrl'
          }
        }
      })
      .state('root.invest-verify-transfer', {
        url: '/invest-verify-transfer/:projectId/:orderId',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'InvestVerifyTransferCtrl',
            controllerUrl: 'scripts/controller/order/invest-verify-transfer-ctrl'
          }
        }
      })
      .state('root.invplan-verify-transfer', {
        url: '/invplan-verify-transfer/:projectId/:amount/:isRepeat/:payAmount/:couponNumber',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'InvPlanVerifyTransferCtrl',
            controllerUrl: 'scripts/controller/order/invplan-verify-transfer-ctrl'
          }
        }
      })
      .state('root.user-order-transfer', {
        url: '/user-order-transfer/:projectId/:orderId/:orderType',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'UserOrderTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/user-order-transfer-ctrl'
          }
        }
      })
      .state('root.transfer-transfer', {
        url: '/transfer-transfer/:transferAmount',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'TransferTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/transfer-transfer-ctrl'
          }
        }
      })

    /**
     * 修改手机号码
     * @type {String}
     */
    .state('root.yeepay', {
        url: '/yeepay/:business/:mobile',
        views: {
          '': {
            templateUrl: 'views/transfer.html',
            controller: 'RechargeTransferCtrl',
            controllerUrl: 'scripts/controller/user-center/recharge-transfer-ctrl'
          }
        }
      })
      /*-------------  lucky-draw  ---------------------------*/
      .state('root.lucky-draw', {
        url: '/lucky-draw',
        views: {
          '': {
            templateUrl: 'views/activity/lucky-draw.html',
            controller: 'LuckyDrawCtrl',
            controllerUrl: 'scripts/controller/activity/lucky-draw-ctrl'
          }
        }
      })
      /*-------------  苏宁推广活动   ----------------------*/
      .state('root.suning-corp', {
        url: '/suning-corp',
        views: {
          '': {
            templateUrl: 'views/activity/suning-corp.html',
            controller: 'LoadPageCtrl',
            controllerUrl: 'scripts/controller/main/load-page-ctrl'
          }
        }
      })

    .state('root.suning-success', {
      url: '/suning-success/:SuccessStatus',
      views: {
        '': {
          templateUrl: 'views/suning-success.html',
          controller: 'SuningSuccessCtrl',
          controllerUrl: 'scripts/controller/main/suning-success-ctrl'
        }
      }
    })
    
    /*---------  user-center  ------------------------*/
    .state('root.userCenter', {
        'url':'/user-center',
        abstract: false,
        views: {
          'user-center': {
            templateUrl: 'views/user-center/user-center.html'
          },
          'sidebar': {
            templateUrl: 'views/user-center/sidebar.html',
            controller: 'UserCenterCtrl',
            controllerUrl: 'scripts/controller/user-center-ctrl'
          }
        }
      })
      .state('root.userCenter.account-overview', {
        url: '/account-overview',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/account-overview.html',
            controller: 'AccountOverviewCtrl',
            controllerUrl: 'scripts/controller/user-center/account-overview-ctrl'
          }
        },
        data: {
          title: '账户总览'
        }
      })
      .state('root.userCenter.assets-overview', {
        url: '/assets-overview',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/assets-overview.html',
            controller: 'AssetsOverviewCtrl',
            controllerUrl: 'scripts/controller/user-center/assets-overview-ctrl'
          }
        },
        data: {
          title: '资产总览'
        }
      })
      .state('root.userCenter.bankcard-management', {
        url: '/bankcard-management',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/bankcard-management.html',
            controller: 'BankCardManagementCtrl',
            controllerUrl: 'scripts/controller/user-center/bankcard-management-ctrl'
          }
        },
        data: {
          title: '银行卡管理'
        }
      })
      .state('root.userCenter.security-settings', {
        url: '/security-settings',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/security-settings.html',
            controller: 'SecuritySettingsCtrl',
            controllerUrl: 'scripts/controller/user-center/security-settings-ctrl'
          }
        },
        data: {
          title: '安全设置'
        }
      })
      // 风险测评调查问卷
      .state('root.userCenter.questionnaire', {
        url: '/questionnaire?number&type',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/questionnaire.html',
            controller: 'QuestionnaireCtrl',
            controllerUrl: 'scripts/controller/user-center/questionnaire-ctrl'
          }
        }
      })
      .state('root.userCenter.recharge', {
        url: '/recharge',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/recharge.html',
            controller: 'RechargeCtrl',
            controllerUrl: 'scripts/controller/user-center/recharge-ctrl'
          }
        },
        data: {
          title: '充值'
        }
      })
      .state('root.userCenter.withdraw', {
        url: '/withdraw',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/withdraw.html',
            controller: 'WithdrawCtrl',
            controllerUrl: 'scripts/controller/user-center/withdraw-ctrl'
          }
        },
        data: {
          title: '提现'
        }
      })

    /**
     * 资金流水
     * @type {String}
     */
    .state('root.userCenter.record', {
      url: '/record',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/record.html',
          controller: 'UserDealCtrl',
          controllerUrl: 'scripts/controller/user-center/user-deal-ctrl'
        }
      },
      data: {
        title: '资金流水'
      }
    })
    .state('root.userCenter.investment', {
      url: '/investment',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/investment.html',
          controller: 'UserOrderCtrl',
          controllerUrl: 'scripts/controller/user-center/user-order-ctrl'
        }
      },
      data: {
        title: '我的订单'
      }
    })

    //债权管理
    .state('root.userCenter.assignments', {
      url: '/assignments?tab',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/assignments.html',
          controller: 'assignmentsCtrl',
          controllerUrl: 'scripts/controller/user-center/assignments-ctrl'
        }
      },
      data: {
        title: '债权管理'
      }
    })
    /**
     * 债权管理-债权转让页面
     */
    .state('root.userCenter.assignments-transfer-details', {
      url: '/assignments-transfer-details/:number',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/assignments-transfer-details.html',
          controller: 'assignmentsTransferCtrl',
          controllerUrl: 'scripts/controller/user-center/assignments-transfer-details-ctrl'
        }
      },
      data: {
        title: '债权详情'
      }
    })
    .state('root.userCenter.gift-rebate', {
        url: '/gift-rebate/:type',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/gift-rebate.html',
            controller: 'UserGiftCtrl',
            controllerUrl: 'scripts/controller/user-center/user-gift-ctrl'
          }
        }
      })
      .state('root.userCenter.gift-rebate-query', {
        url: '/gift-rebate/:type/:dateInterval/:status',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/gift-rebate.html',
            controller: 'UserGiftCtrl',
            controllerUrl: 'scripts/controller/user-center/user-gift-ctrl'
          }
        }
      })
      .state('root.userCenter.gift-overview', {
        url: '/gift-overview',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/gift-overview.html',
            controller: 'GiftOverviewCtrl',
            controllerUrl: 'scripts/controller/user-center/gift-overview-ctrl'
          }
        }
      })
      .state('root.userCenter.invite-rebate', {
        url: '/invite-rebate',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/invite-rebate.html',
            controller: 'InviteRebateCtrl',
            controllerUrl: 'scripts/controller/user-center/invite-rebate-ctrl'
          }
        }
      })

    .state('root.userCenter.message', {
      url: '/message/:status',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/message.html',
          controller: 'MessageCtrl',
          controllerUrl: 'scripts/controller/user-center/message-ctrl'
        }
      }
    })

    /**
     * 预约订单
     * @type {String}
     */
    .state('root.userCenter.reservation', {
      url: '/reservation',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/reservation.html',
          controller: 'ReservationCtrl',
          controllerUrl: 'scripts/controller/user-center/reservation-ctrl'
        }
      },
      data: {
        title: '预约记录'
      }
    })

    /**
     * 特权本金（个人中心）
     * @type {String}
     */
    .state('root.userCenter.experienceMoney', {
      url: '/experience-money',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/experience-money.html',
          controller: 'ExperienceMoneyCtrl',
          controllerUrl: 'scripts/controller/user-center/experience-money-ctrl'
        }
      },
      data: {
        title: '特权本金'
      }
    })

    /**
     * 加息券（个人中心）
     */
    .state('root.userCenter.rate-coupon', {
      url: '/rate-coupon',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/rate-coupon.html',
          controller: 'IncreaseCouponCtrl',
          controllerUrl: 'scripts/controller/user-center/increase-coupon-ctrl'
        }
      },
      data: {
        title: '加息券'
      }
    })

    /**
     * 我的奖金
     */
    .state('root.userCenter.cash-coupon', {
      url: '/cash-coupon',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/cash-coupon.html',
          controller: 'CashCouponCtrl',
          controllerUrl: 'scripts/controller/user-center/cash-coupon-ctrl'
        }
      },
      data: {
        title: '我的奖金'
      }
    })

    /**
     * 我的债权（个人中心）
     */
    .state('root.userCenter.credit', {
      url: '/credit/:searchStatus',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/credit.html',
          controller: 'CreditCtrl',
          controllerUrl: 'scripts/controller/user-center/credit-ctrl'
        }
      },
      data: {
        title: '我的债权'
      }
    })

    /**
     * 宏金宝债权详情
     */
    .state('root.userCenter.credit-security-details', {
      url: '/credit-security-details/:type/:number',
      views: {
        'user-center-right': {
          templateUrl: 'views/user-center/credit-security-details.html',
          controller: 'CreditSecurityCtrl',
          controllerUrl: 'scripts/controller/user-center/credit-security-details-ctrl.js'
        }
      },
      data: {
        title: '债权详情'
      }
    })

    /**
     * 宏金盈债权详情
     */
    .state('root.userCenter.credit-profit-details', {
        url: '/credit-profit-details/:type/:number',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/credit-profit-details.html',
            controller: 'CreditProfitCtrl',
            controllerUrl: 'scripts/controller/user-center/credit-profit-details-ctrl.js'
          }
        },
        data: {
          title: '债权详情'
        }
      })
      .state('root.userCenter.credit-query', {
        url: '/credit/:dateInterval/:type',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/credit.html',
            controller: 'CreditCtrl',
            controllerUrl: 'scripts/controller/user-center/credit-ctrl'
          }
        }
      })
      .state('root.userCenter.credit-create', {
        url: '/credit-create/:number',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/credit-create.html',
            controller: 'CreditCreateCtrl',
            controllerUrl: 'scripts/controller/user-center/credit-create-ctrl'
          }
        }
      })


    .state('root.reservation-success', {
        url: '/reservation-success/:status',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'ReservationSuccessCtrl',
            controllerUrl: 'scripts/controller/user-center/reservation-success-ctrl'
          }
        }
      })
      /*----------  yeepay  ---------------------*/

    .state('app-yeepay-callback', {
      url: '/app-yeepay-register-callback',
      views: {
        '': {
          templateUrl: 'views/wireless/register_ok_callback.html'
        }
      }
    })

    /*--------------------  project  ------------------------*/
    // .state('root.project-category', {
    //     url: '/project-category',
    //     views: {
    //       '': {
    //         templateUrl: 'views/project/project-category.html',
    //         controller: 'ProjectCategoryCtrl',
    //         controllerUrl: 'scripts/controller/project/project-category-ctrl'
    //       }
    //     }
    //   })
      .state('root.project-activity-group', {
        url: '/project-activity-group',
        views: {
          '': {
            templateUrl: 'views/project/project-activity-group.html',
            controller: 'ProjectActivityGroupCtrl',
            controllerUrl: 'scripts/controller/project/project-activity-group-ctrl'
          }
        }
      })
      // 尊贵、精选列表
      .state('root.guaranteepro-list-query', {
        url: '/guaranteepro-list/:status/:projectDays/:earning/:total/:sortCondition/:sortType/:type',
        views: {
          '': {
            templateUrl: 'views/project/guaranteepro-list.html',
            controller: 'GuaranteeproListCtrl',
            controllerUrl: 'scripts/controller/project/guaranteepro-list-ctrl'
          }
        }
      })
      .state('root.guaranteepro-list-query-no', {
        url: '/guaranteepro-list/:type',
        views: {
          '': {
            templateUrl: 'views/project/guaranteepro-list.html',
            controller: 'GuaranteeproListCtrl',
            controllerUrl: 'scripts/controller/project/guaranteepro-list-ctrl'
          }
        }
      })
      .state('root.investmentplan-list', {
        url: '/investmentplan-list',
        views: {
          '': {
            templateUrl: 'views/project/investmentplan-list.html',
            controller: 'InvestmentplanListCtrl',
            controllerUrl: 'scripts/controller/project/investmentplan-list-ctrl'
          }
        }
      })
      /**
       * 宏金盈列表页新
       */
      .state('root.investmentplan-Newlist', {
        url: '/fundsproject-list',
        views: {
          '': {
            templateUrl: 'views/project/fundsproject-list.html',
            controller: 'FundsProjectListCtrl',
            controllerUrl: 'scripts/controller/project/fundsproject-list-ctrl'
          }
        }
      })
      .state('root.activity-details', {
        url: '/activity/:number/:type',
        views: {
          '': {
            templateUrl: 'views/project/activity-details.html',
            controller: 'ActivityDetailsCtrl',
            controllerUrl: 'scripts/controller/project/activity-details-ctrl'
          }
        }
      })
      .state('root.project-details', {
        url: '/project/:number/:type',
        views: {
          '': {
            templateUrl: 'views/project/project-details.html',
            controller: 'ProjectDetailsCtrl',
            controllerUrl: 'scripts/controller/project/project-details-ctrl'
          }
        }
      })

    /**
     * 零存宝详情页
     * tab表示用户登录前的位置
     */
    .state('root.current-deposit-details', {
      url: '/current-deposit/:number?tab',
      views: {
        '': {
          templateUrl: 'views/project/current-deposit-details.html',
          controller: 'InvestmentplanDetailsCtrl',
          controllerUrl: 'scripts/controller/project/investmentplan-details-ctrl'
        }
      }
    })

    /**
     * 宏金盈详情页
     * tab表示用户登录前的位置
     */
    .state('root.investmentplan-details', {
      url: '/investmentplan/:number?tab',
      views: {
        '': {
          templateUrl: 'views/project/investmentplan-details.html',
          controller: 'InvestmentplanDetailsCtrl',
          controllerUrl: 'scripts/controller/project/investmentplan-details-ctrl'
        }
      }
    })

    /**
     * 担保公司页面
     */
    .state('root.project-sponsorInstitution', {
      url: '/project-sponsorInstitution/:guaranteeId',
      views: {
        '': {
          templateUrl: 'views/project/project-sponsorInstitution.html',
          controller: 'ProjectSponsorInstitutionCtrl',
          controllerUrl: 'scripts/controller/project/project-sponsorInstitution-ctrl'
        },
        'sponsor': {
          templateUrl: 'views/project/project-sponsor-list.html',
          controller: 'ProjectSponsorInstitutionCtrl',
          controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
        }
      }
    })

    /**
     * 预约流程页
     */
    .state('root.appointment-project', {
        url: '/appointment-project',
        views: {
          '': {
            templateUrl: 'views/project/appointment-project.html',
            controller: 'AppointmentProjectCtrl',
            controllerUrl: 'scripts/controller/project/appointment-project-ctrl'
          }
        }
      })
      /*------------------  safe  ---------------------*/
      .state('root.safe', {
        url: '/safe',
        views: {
          '': {
            templateUrl: 'views/safe.html',
            controller: 'SafeCtrl',
            controllerUrl: 'scripts/controller/project/safe-ctrl'
          }
          /*,
                'sponsor': {
                  templateUrl: 'views/project/project-sponsor-list.html',
                  controller: 'GuaranteeListCtrl',
                  controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
                }*/
        }
      })
      .state('root.safe-nav', {
        url: '/safe/:anchor',
        views: {
          '': {
            templateUrl: 'views/safe.html',
            controller: 'SafeCtrl',
            controllerUrl: 'scripts/controller/project/safe-ctrl'
          }
          /*,
                'sponsor': {
                  templateUrl: 'views/project/project-sponsor-list.html',
                  controller: 'GuaranteeListCtrl',
                  controllerUrl: 'scripts/controller/enterprise/guarantee-list-ctrl'
                }*/
        }
      })

    /*---------------------------------------------  upload  ---------------------------------------------*/
    // .state('root.upload', {
    //  url: '/upload',
    //  views: {
    //    '': {
    //      templateUrl: 'views/upload/upload.html',
    //      controller: 'UploadCtrl',
    //      controllerUrl: 'scripts/controller/upload/upload-ctrl'
    //    }
    //  }
    // })
    /*---------------------------------------------  order  ---------------------------------------------*/
    /**
     * 投资信息确认页面:购物车
     */
    .state('root.invest-verify', {
        url: '/invest-verify/:projectId/:amount',
        views: {
          '': {
            templateUrl: 'views/order/invest-verify.html',
            controller: 'investVerifyCtrl',
            controllerUrl: 'scripts/controller/order/invest-verify-ctrl'
          }
        }
      })
      /**
       * 宏包信息确认页面
       */
      .state('root.hongbao-verify', {
        url: '/hongbao-verify/:activityId/:amount',
        views: {
          '': {
            templateUrl: 'views/order/hongbao-verify.html',
            controller: 'hongbaoVerifyCtrl',
            controllerUrl: 'scripts/controller/order/hongbao-verify-ctrl'
          }
        }
      })
      /**
       * 宏金盈购物车
       */
      .state('root.invplan-verify', {
        url: '/invplan-verify/:projectId/:amount/:isRepeat',
        views: {
          '': {
            templateUrl: 'views/order/invplan-verify.html',
            controller: 'InvPlanVerifyCtrl',
            controllerUrl: 'scripts/controller/order/invplan-verify-ctrl'
          }
        }
      })

      /**
       * ********************* 信息披露 ***********************
       */
      .state('root.disclosure', {
        abstract: true,
        url: '/disclosure',
        views: {
          'disclosure-right': {
            templateUrl: 'views/disclosure/disclosure.html',
            controller: 'disclosureCtrl',
            controllerUrl: 'scripts/controller/disclosure/disclosure-ctrl'
          },
          'disclosure-sidebar': {
            templateUrl: 'views/disclosure/disclosure-sidebar.html',
            controller: 'disclosureCtrl',
            controllerUrl: 'scripts/controller/disclosure/disclosure-ctrl'
          }
        },
        data: {
          title: '信息披露'
        }
      })
      /**
       * 银行存管
       */
      .state('root.disclosure.bank-disclosure', {
        url: '/bank-disclosure',
        views: {
          'disclosure-right-show': {
            templateUrl: 'views/disclosure/bank-disclosure.html'
          }
        }
      })
      /**
       * 备案信息
       */
      .state('root.disclosure.information', {
        url: '/information',
        views: {
          'disclosure-right-show': {
            templateUrl: 'views/disclosure/information.html'
          }
        }
      })
      /**
       * 风险管理
       */
      .state('root.disclosure.risk-management', {
        url: '/risk-management',
        views: {
          'disclosure-right-show': {
            templateUrl: 'views/disclosure/risk-management.html'
          }
        }
      })
      /**
       * 组织信息
       */
      .state('root.disclosure.organization', {
        url: '/organization',
        views: {
          'disclosure-right-show': {
            templateUrl: 'views/disclosure/organization.html'
          }
        }
      })
      /**
       * 经营信息
       */
      .state('root.disclosure.business-information', {
        url: '/business-information',
        views: {
          'disclosure-right-show': {
            templateUrl: 'views/disclosure/business-information.html'
          }
        }
      })
      /**
       * 政策法规
       */
      .state('root.disclosure.policies-regulations', {
        url: '/policies-regulations',
        views: {
          'disclosure-right-show': {
            templateUrl: 'views/disclosure/policies-regulations.html'
          }
        }
      })
      /**
       * 运营年报2017
       */
      .state('root.disclosure.operating-report-2017', {
        url: '/operating-report-2017',
        views: {
          'disclosure-right-show': {
            templateUrl: 'views/disclosure/operating-report-2017.html'
          }
        }
      })
      /**
       * 运营年报2016
       */
      .state('root.disclosure.operating-report-2016', {
        url: '/operating-report-2016',
        views: {
          'disclosure-right-show': {
            templateUrl: 'views/disclosure/operating-report-2016.html'
          }
        }
      })
      /**
       * 2017年度财务审计报告
       */
      .state('root.auditPDF', {
        url: '/auditPDF',
        views: {
          '': {
            templateUrl: 'views/disclosure/auditPDF.html'
          }
        }
      })
      /**
       * 政策法规-法律条纹（无外链的）
       */
      .state('root.policies', {
        url: '/policies',
        views: {
          '': {
            templateUrl: 'views/disclosure/policies.html'
          }
        }
      })
      

      // 贷后管理信息
      .state('root.userCenter.postLoanManagementInfo', {
        url: '/postLoanManagementInfo/:number',
        views: {
          'user-center-right': {
            templateUrl: 'views/user-center/postLoanManagementInfo.html',
            controller: 'postLoanManagementInfoCtrl',
            controllerUrl: 'scripts/controller/user-center/postLoanManagementInfo'
          }
        }
      })

      /**
       * ********************* 关于我们 20160621 ***********************
       */
      .state('root.us', {
        abstract: true,
        url: '/us',
        views: {
          'about-us-right': {
            templateUrl: 'views/about-us/about-us.html',
            controller: 'AboutUsCtrl',
            controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
          },
          'about-sidebar': {
            templateUrl: 'views/about-us/about-sidebar.html',
            controller: 'AboutUsCtrl',
            controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
          }
        }
      })

      /**
       * 项目方介绍
       */
      .state('root.us.projecter', {
        url: '/projecter',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/introduction-of-projecter.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      /**
       * 平台方介绍
       */
      .state('root.us.platform', {
        url: '/platform',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/introduction-of-platform2.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      /*-------- media-reports  -------------------*/
      .state('root.us.media-reports', {
        url: '/media-reports',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/media-reports-list.html',
            controller: 'MediaReportsCtrl',
            controllerUrl: 'scripts/controller/about-us/media-report-ctrl'
          }
        }
      })
      .state('root.us.media-reports-detail', {
        url: '/media-reports/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/media-reports-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })
      /*-----------  web-site-notice  ---------------------------*/
      .state('root.us.web-site-notice', {
        url: '/web-site-notice',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/web-site-notice-list.html',
            controller: 'WebSiteNoticeCtrl',
            controllerUrl: 'scripts/controller/about-us/web-site-notice-ctrl'
          }
        }
      })
      .state('root.us.web-site-notice-detail', {
        url: '/web-site-notice/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/web-site-notice-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })
      /*------------  hongcai-trends  -------------------------*/
      .state('root.us.hongcai-trends', {
        url: '/hongcai-trends',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/hongcai-trends-list.html',
            controller: 'HongcaiTrendsCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-ctrl'
          }
        }
      })
      .state('root.us.hongcai-trends-detail', {
        url: '/hongcai-trends/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/hongcai-trends-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })

      /**
       * 加入宏财
       */
      .state('root.us.company-profile', {
        url: '/company-profile',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/company-profile.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      /**
       * 联系我们
       */
      .state('root.us.link-us', {
        url: '/link-us',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/link-us.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })


      /*----------------  about-us  --------------------------------*/
      .state('root.about-us', {
        abstract: true,
        views: {
          'about-us-right': {
            templateUrl: 'views/about-us/about-us.html',
            controller: 'AboutUsCtrl',
            controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
          },
          'about-sidebar': {
            templateUrl: 'views/about-us/about-sidebar.html',
            controller: 'AboutUsCtrl',
            controllerUrl: 'scripts/controller/about-us/about-us-ctrl'
          }
        }
      })
      // .state('root.about-us.introduction-of-platform', {
       .state('root.about-us.introduction-of-platform2', {
        url: '/introduction-of-platform',
        views: {
          'about-us-right-show': {
            // templateUrl: 'views/about-us/introduction-of-platform.html',
            templateUrl: 'views/about-us/introduction-of-platform2.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.about-us.company-profile', {
        url: '/company-profile',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/company-profile.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.about-us.consultant-team', {
        url: '/consultant-team',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/consultant-team.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.about-us.introduction-of-projecter', {
        url: '/introduction-of-projecter',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/introduction-of-projecter.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      /*------------------  partner  ------------------------*/
      .state('root.partner', {
        abstract: true,
        views: {
          'partner-right': {
            templateUrl: 'views/partner/partner.html',
            controller: 'PartnerCtrl',
            controllerUrl: 'scripts/controller/partner/partner-ctrl'
          },
          'partner-sidebar': {
            templateUrl: 'views/partner/partner-sidebar.html',
            controller: 'PartnerCtrl',
            controllerUrl: 'scripts/controller/partner/partner-ctrl'
          }
        }
      })
      .state('root.partner.partner-platform', {
        url: '/partner-platform',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/platform.html'
          }
        }
      })
      // .state('root.partner.company-profile', {
      //   url: '/partner-company-profile',
      //   views: {
      //     'partner-right-show': {
      //       templateUrl: 'views/partner/company-profile.html',
      //       controller: 'HelpCenterCtrl',
      //       controllerUrl: 'scripts/controller/partner/help-center-ctrl'
      //     }
      //   }
      // })
      .state('root.partner.partner-zhongdong', {
        url: '/partner-zhongdong',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/zhongdong.html',
          }
        }
      })
      .state('root.partner.partner-jilian', {
        url: '/partner-jilian',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/jilian.html',
          }
        }
      })
      .state('root.partner.partner-jibei', {
        url: '/partner-jibei',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/jibei.html',
          }
        }
      })
      // yeepay
      .state('root.partner.partner-yeepay', {
        url: '/partner-yeepay',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/yeepay.html',
          }
        }
      })
      .state('root.partner.partner-tianchang', {
        url: '/partner-tianchang',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/tianchang.html',
          }
        }
      })
      .state('root.partner.partner-hexing', {
        url: '/partner-hexing',
        views: {
          'partner-right-show': {
            templateUrl: 'views/partner/hexing.html',
          }
        }
      })
      /*-------- media-reports  -------------------*/
      .state('root.about-us.media-reports', {
        url: '/media-reports',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/media-reports-list.html',
            controller: 'MediaReportsCtrl',
            controllerUrl: 'scripts/controller/about-us/media-report-ctrl'
          }
        }
      })
      .state('root.about-us.media-reports-detail', {
        url: '/media-reports/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/media-reports-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })
      .state('root.about-us.media-reports-detail1', {
        url: '/media-reports-detail/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/media-reports-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })
      /*-----------  web-site-notice  ---------------------------*/
      .state('root.about-us.web-site-notice', {
        url: '/web-site-notice',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/web-site-notice-list.html',
            controller: 'WebSiteNoticeCtrl',
            controllerUrl: 'scripts/controller/about-us/web-site-notice-ctrl'
          }
        }
      })
      .state('root.about-us.web-site-notice-detail', {
        url: '/web-site-notice/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/web-site-notice-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })
      .state('root.about-us.web-site-notice-detail1', {
        url: '/web-site-notice-detail/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/web-site-notice-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })
      /*------------  hongcai-trends  -------------------------*/
      .state('root.about-us.hongcai-trends', {
        url: '/hongcai-trends',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/hongcai-trends-list.html',
            controller: 'HongcaiTrendsCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-ctrl'
          }
        }
      })
      .state('root.about-us.hongcai-trends-detail', {
        url: '/hongcai-trends/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/hongcai-trends-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })
      .state('root.about-us.hongcai-trends-detail1', {
        url: '/hongcai-trends-detail/:textId',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/hongcai-trends-detail.html',
            controller: 'HongcaiTrendsDetailCtrl',
            controllerUrl: 'scripts/controller/about-us/hongcai-trends-detail-ctrl'
          }
        }
      })

    /*-------  get-pwd-back  ----------------------*/
    .state('root.get-pwd-back', {
        url: '/get-pwd-back',
        views: {
          '': {
            templateUrl: 'views/get-pwd-back/get-pwd-back.html',
            controller: 'GetPwdCtrl',
            controllerUrl: 'scripts/controller/get-pwd-back/get-pwd-back-ctrl'
          }
        }
      })
      /*---------  set-new-pwd  --------------------*/
      .state('root.set-new-pwd', {
        url: '/set-new-pwd/:uuid/:etoken',
        views: {
          '': {
            templateUrl: 'views/get-pwd-back/set-new-pwd.html',
            controller: 'SetNewPwdCtrl',
            controllerUrl: 'scripts/controller/get-pwd-back/get-pwd-back-ctrl'
          }
        }
      })
      /*----  agreement --------------------------*/
      .state('root.registration-agreement', {
        url: '/registration-agreement',
        views: {
          '': {
            templateUrl: 'views/agreement/registration-agreement.html'
          }
        }
      })
      .state('root.loan-security-agreement', {
        url: '/loan-security-agreement',
        views: {
          '': {
            templateUrl: 'views/agreement/loan-security-agreement.html'
          }
        }
      })
      .state('root.appointment-project-activityrule', {
        url: '/appointment-project-activityrule',
        views: {
          '': {
            templateUrl: 'views/agreement/appointment-project-activityrule.html'
          }
        }
      })
      .state('root.assignment-agreement', {
        url: '/assignment-agreement?assignmentType',
        views: {
          '': {
            templateUrl: 'views/agreement/assignment-agreement.html',
            controller: 'AssignmentAgreementCtrl',
            controllerUrl: 'scripts/controller/assignment-agreement-ctrl'
          }
        }
      })
      /*----------  help-center  -------------------*/
      .state('root.about-us.link-us', {
        url: '/link-us',
        views: {
          'about-us-right-show': {
            templateUrl: 'views/about-us/link-us.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center', {
        views: {
          'help-center-right': {
            templateUrl: 'views/help-center/help-center.html'
          },
          'help-sidebar': {
            templateUrl: 'views/help-center/help-sidebar.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })

    /*----------  帮助  -------------------*/
    .state('root.help-center.introduce', {
        url: '/introduce',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/introduce.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.investors', {
        url: '/investors',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/investors.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.assignment_qr', {
        url: '/assignment_qr',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/assignment_qr.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.investment', {
        url: '/investment',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/investment.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.account-management', {
        url: '/account-management',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/account-management.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.safety-certification', {
        url: '/safety-certification',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/safety-certification.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.law-and-policy-guarantee', {
        url: '/law-and-policy-guarantee',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/law-and-policy-guarantee.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.recharge-and-withdrawals', {
        url: '/recharge-and-withdrawals',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/recharge-and-withdrawals.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      .state('root.help-center.user-welfare', {
        url: '/user-welfare',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/user-welfare.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      // 客户服务
      .state('root.help-center.customer-service', {
        url: '/customer-service',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/customer-service.html',
            controller: 'HelpCenterCtrl',
            controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
          }
        }
      })
      // .state('root.help-center.product', {
      //   url: '/product',
      //   views: {
      //     'help-center-right-show': {
      //       templateUrl: 'views/help-center/product.html',
      //       controller: 'HelpCenterCtrl',
      //       controllerUrl: 'scripts/controller/help-center/help-center-ctrl'
      //     }
      //   }
      // })

    /*--------------- credit assignment  ------------------------*/
    /**
     * 债权转让列表页 FIX,暂时和列表页公用
     */
    // .state('root.assignments', {
    //     url: '/credit-list/:minTransferAmout/:maxTransferAmount/:minCycle/:maxCycle/:minEarning/:maxEarning/:minTotalAmount/:maxTotalAmount/:sortCondition/:sortType',
    //     views: {
    //       '': {
    //         templateUrl: 'views/project/credit-list.html',
    //         controller: 'CreditListCtrl',
    //         controllerUrl: 'scripts/controller/project/credit-list-ctrl'
    //       }
    //     }
    //   })
      .state('root.assignments', {
        url: '/assignments?page&pageSize&sortType&remainDays&annualEarnings&sortOrder&currentStocks',
        views: {
          '': {
            templateUrl: 'views/assignment/assignment-list.html',
            controller: 'AssignmentListCtrl',
            controllerUrl: 'scripts/controller/assignment/assignment-list-ctrl'
          }
        }
      })
      /**
       * 债权转让详情页
       */
      .state('root.assignments-detail', {
        url: '/assignments/:number',
        views: {
          '': {
            templateUrl: 'views/project/assignments-detail.html',
            controller: 'AssignmentDetailCtrl',
            controllerUrl: 'scripts/controller/assignment/assignment-detail-ctrl'
          }
        }
      })

    /**
     * 债权转让下单页(确认页)
     */
    .state('root.credit-verify', {
        url: '/credit-verify/:creditId/:amount',
        views: {
          '': {
            templateUrl: 'views/order/credit-verify.html',
            controller: 'CreditVerifyCtrl',
            controllerUrl: 'scripts/controller/order/credit-verify-ctrl'
          }
        }
      })
      /**
       * 债权转让宣传介绍页面
       */
      .state('root.credit-assignment', {
        url: '/credit-assignment',
        views: {
          '': {
            templateUrl: 'views/project/credit-assignment.html',
            controller: 'CreditAssignmentCtrl',
            controllerUrl: 'scripts/controller/project/credit-assignment-ctrl'
          }
        }
      })
      /**
       * 成功回调页
       */
      .state('root.credit-success', {
        url: '/credit-success/:etoken',
        views: {
          '': {
            templateUrl: 'views/success.html',
            controller: 'CreditSuccessCtrl',
            controllerUrl: 'scripts/controller/project/credit-success-ctrl'
          }
        }
      })



    /*------------------  app help-center  -----------------------------------------------*/
    .state('app-help-center', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'views/help-center/help-center.html'
          }
        }
      })
      .state('app-help-center.introduce', {
        url: '/introduce-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/introduce-app.html'
          }
        }
      })
      .state('app-help-center.investors', {
        url: '/investors-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/investors-app.html'
          }
        }
      })
      .state('app-help-center.account-management', {
        url: '/account-management-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/account-management-app.html'
          }
        }
      })
      .state('app-help-center.safety-certification', {
        url: '/safety-certification-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/safety-certification-app.html'
          }
        }
      })
      .state('app-help-center.law-and-policy-guarantee', {
        url: '/law-and-policy-guarantee-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/law-and-policy-guarantee-app.html'
          }
        }
      })
      .state('app-help-center.other-question', {
        url: '/other-question-app',
        views: {
          'help-center-right-show': {
            templateUrl: 'views/help-center/other-question-app.html'
          }
        }
      })

    /*--------------------  load page  route  -----------------------------------------*/
    .state('root.load-page', {
        url: '/load-page?f&inviteCode',
        views: {
          '': {
            templateUrl: 'views/load-page.html',
            controller: 'LoadPageCtrl',
            controllerUrl: 'scripts/controller/main/load-page-ctrl'
          }
        }
      })

    /**
     * 活动父 state，所有的活动落地页都在此 state下
     */
    .state('root.activity', {
      url: '/activity',
      abstract: true,
      views: {
        '': {
          templateUrl: 'views/activity/root-activity.html'
        }
      }
    })
    /*-------------  邀请活动-2017.4.13   ----------------------*/
    .state('root.activity.invite-activity', {
      url: '/invite',
      views: {
        '': {
          templateUrl: 'views/activity/invite.html'
        }
      },
      data: {
        title: '邀请好友'
      }
    }) 
    /*-------------  激活银行存管落地页   ----------------------*/
    .state('root.bank-custody-landing', {
      url: '/bank-custody-landing',
      views: {
        '': {
          templateUrl: 'views/activate-landing.html',
          controller: 'ActivateLandingCtrl',
          controllerUrl: 'scripts/controller/user-center/activate-landing-ctrl'
        },
        data: {
          title: '银行存管介绍'
        }
      }
    })
    // 开通银行存管落地页——上线后
    .state('root.bank-custody', {
      url: '/bank-custody',
      data: {
        title: '银行存管介绍'
      },
      views: {
        '': {
          templateUrl: 'views/bank-custody.html',
          controller: 'BankCustodyCtrl',
          controllerUrl: 'scripts/controller/user-center/bank-custody-ctrl'
        }
      }
    })
    /*-------------   银行存管流程  ----------------------*/
    .state('root.old-user-process', {
      url: '/old-user-process',
      views: {
        '': {
          templateUrl: 'views/old-user-process.html',
        }
      }
    })
    .state('root.new-user-process', {
      url: '/new-user-process',
      views: {
        '': {
          templateUrl: 'views/new-user-process.html',
        }
      }
    })
    /*-------------  体验金项目专享详情页   ----------------------*/
    .state('root.experience-project', {
      url: '/experience-project',
      views: {
        '': {
          templateUrl: 'views/project/experience-project.html',
          controller: 'ExperienceProjectCtrl',
          controllerUrl: 'scripts/controller/project/experience-project-ctrl'
        }
      }
    })
    /*-------------  新手引导页面   ----------------------*/
    .state('root.novice-guide', {
      url: '/novice-guide',
      views: {
        '': {
          templateUrl: 'views/novice-guide.html',
          controller: 'NoviceGuideCtrl',
          controllerUrl: 'scripts/controller/help-center/experience-project-ctrl'
        }
      }
    })
      /*---------------- traffic import route  ----------------------*/
    .state('root.registerMobile-sanGuo', {
      url: '/register-mobile-sanGuo/:f',
      views: {
        '': {
          templateUrl: 'views/register/register-mobile-sanGuo.html',
          controller: 'RegisterMobileSanGuoCtrl',
          controllerUrl: 'scripts/controller/register/register-mobile-ctrl'
        }
      }
    })
    .state('root.project-details-traffic', {
      url: '/project/:projectId/:f',
      views: {
        '': {
          templateUrl: 'views/project/project-details.html',
          controller: 'ProjectDetailsCtrl',
          controllerUrl: 'scripts/controller/project/project-details-ctrl'
        }
      }
    })
    .state('root.investment-agree', {
      url: '/investment-agree',
      views: {
        '': {
          templateUrl: 'views/investment-agree.html'
        }
      }
    })
    // 自动投标授权书
    .state('root.automatic-tender-authorization', {
      url: '/automatic-tender-authorization',
      views: {
        '': {
          templateUrl: 'views/automatic-tender-authorization.html',
        }
      }
    })

    // 系统维护
    .state('update', {
      url: '/update?return',
      views: {
        '': {
          templateUrl: 'views/sys-update.html',
          controller: 'SysUpdateCtrl',
          controllerUrl: 'scripts/controller/system-update-ctrl'
        }
      }
    });
    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://www.hongcai.com/hongcai/api/**']);

    /**
     * 导致IE8不兼容的地方。
     */
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.when('', '/');

    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

  }]);


hongcaiApp.constant('DEFAULT_DOMAIN', '/hongcai/api/v1');
hongcaiApp.constant('RESTFUL_DOMAIN', '/hongcai/rest');
hongcaiApp.constant('projectStatusMap', {"96":"终审被拒绝","1":"创建中","97":"拒绝发布","2":"创建完成","98":"融资失败","3":"审核中","99":"已删除","4":"初审通过","5":"终审通过","6":"预发布","7":"融资中","8":"融资成功","9":"还款中","10":"还款完成","11":"预约中","12":"预约处理异常","95":"初审被拒绝"});
