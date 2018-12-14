'use strict';
angular.module('hongcaiApp')
  .factory('UserCenterService', function($resource, DEFAULT_DOMAIN, RESTFUL_DOMAIN) {
    return {
      dayProfit: $resource(DEFAULT_DOMAIN + '/siteCredit/getUserDayProfit', {}),
      userSecurityInfo: $resource(DEFAULT_DOMAIN + '/siteUser/userSecurityInfo', {}),
      register: $resource(RESTFUL_DOMAIN + '/users/0/yeepayRegister', {
        realName: '@realName',
        idNo: '@idNo',
        autoTransfer: '@autoTransfer'
      }, {
        'post':   {method:'POST'}
      }),
      /**
       * 授权自动投标
       */
      authorizeAutoTransfer: $resource(RESTFUL_DOMAIN + '/users/0/authorizeAutoTransfer', {
        projectNumber: '@projectNumber'
      }, {'post':   {method:'POST'}}),
      recharge: $resource(RESTFUL_DOMAIN + '/users/0/recharge', {
        amount: '@amount',
        rechargeWay: '@rechargeWay',
        expectPayCompany: '@expectPayCompany'
      }, {
        'post':   {method:'POST'}
      }),
      withdraw: $resource(RESTFUL_DOMAIN + '/users/0/withdraw', {
        amount: '@amount'
      }, {
        'post':   {method:'POST'}
      }),
      bindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/bindBankCard', {}),
      cgtUnbindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/cgtUnbindBankCard', {}),
      unbindBankCard: $resource(DEFAULT_DOMAIN + '/yeepay/unbindBankCard', {
        payCompany: '@payCompany'
      }),
      // getBankCardLimit: $resource(DEFAULT_DOMAIN + '/bank/getBankRechargeLimit',{}), // 之前获取不同支付方式银行卡限额接口
      getBankCardLimit: $resource(RESTFUL_DOMAIN + '/bankcard/rechargeBankLimits',{},
        {
        'get': {
          method:'GET',
          isArray: true  
        }
      }),
      getUserAccount: $resource(DEFAULT_DOMAIN + '/siteAccount/userAccount'),
      userAccount: $resource(RESTFUL_DOMAIN + '/users/0/account',{}),
      getUserAvailableCash: $resource(DEFAULT_DOMAIN + '/siteAccount/getUserAvailableCash'),
      getUserOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderByUser'),
      getOrderByUser: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderByUser', {
        page: '@page',
        pageSize: '@pageSize',
        type: '@type',
        dateInterval: '@dateInterval',
        status: '@status'
      }),
      getGiftOrderByUser: $resource(DEFAULT_DOMAIN + '/siteOrder/getGiftOrderByUser', {
        type: '@type',
        dateInterval: '@dateInterval',
        status: '@status'
      }),
      getUserBalance: $resource(DEFAULT_DOMAIN + '/siteAccount/getUserBalance'),

      /**
       * 发送短信验证码
       * mobile: 手机号
       * picCaptcha: 图形验证码
       * business: 业务
       */
      sendMobileCaptcha: $resource(RESTFUL_DOMAIN + '/users/mobileCaptcha', {}, {
        save: {
          method: 'POST',
          params: {
            mobile: '@mobile',
            picCaptcha: '@picCaptcha',
            business: '@business',
            guestId: '@guestId'
          }
        }
      }),
      bindMobile: $resource(DEFAULT_DOMAIN + '/siteUser/bindMobile', {
        mobile: '@mobile',
        captcha: '@captcha'
      }),
      bindEmail: $resource(DEFAULT_DOMAIN + '/siteUser/bindEmail', {
        email: '@email'
      }),
      changePassword: $resource(DEFAULT_DOMAIN + '/siteUser/changePassword', {
        oldPassword: '@oldPassword',
        newPassword: '@newPassword',
        repeatNewPassword: '@repeatNewPassword'
      }),
      getUserBankCard: $resource(DEFAULT_DOMAIN + '/bank/getUserBankCard', {}),

      /**
       * 校验短信验证码
       */
      checkMobileCaptcha: $resource(DEFAULT_DOMAIN + '/siteUser/checkMobileCaptcha', {
        mobile: '@mobile',
        captcha: '@captcha',
        business: '@business'
      }),
      sendResetPwdEmail: $resource(DEFAULT_DOMAIN + '/siteUser/sendResetPwdEmail', {
        email: '@email'
      }),
      getDealByUser: $resource(DEFAULT_DOMAIN + '/siteUser/getDealListByUser', {
        dateInterval: '@dateInterval',
        dealType: '@dealType'
      }),
      resetMobilePassword: $resource(DEFAULT_DOMAIN + '/siteUser/resetMobilePassword', {
        mobile: '@mobile',
        captcha: '@captcha',
        password: '@password'
      }),
      infoVerify: $resource(DEFAULT_DOMAIN + '/siteUser/infoVerify', {
        account: '@account',
        mobile: '@mobile',
        email: '$email'
      }),
      resetEmailPassword: $resource(DEFAULT_DOMAIN + '/siteUser/resetEmailPassword', {
        uuid: '$uuid',
        etoken: '@etoken',
        password: '@password'
      }),
      checkEmailPasswordUrl: $resource(DEFAULT_DOMAIN + '/siteUser/checkEmailPasswordUrl', {
        uuid: '$uuid',
        etoken: '@etoken'
      }),
      getGiftListByUserId: $resource(DEFAULT_DOMAIN + '/activity/getGiftListByUserId'),
      getInviteList: $resource(DEFAULT_DOMAIN + '/activity/getInviteList'),
      getOrderBillByOrderId: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderBillByOrderId', {
        number: '$number'
      }),
      cancelOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/cancelOrder', {
        number: '$number'
      }),
      luckyDraw: $resource(DEFAULT_DOMAIN + '/activity/luckyDraw', {}),
      getLuckyList: $resource(DEFAULT_DOMAIN + '/activity/getLuckyList', {}),
      getUnreadMsgCount: $resource(DEFAULT_DOMAIN + '/siteMsg/getUnreadMsgCount'),
      getUserMsgByStatus: $resource(DEFAULT_DOMAIN + '/siteMsg/getUserMsgByStatus', {
        status: '$status'
      }),
      readOneMsg: $resource(DEFAULT_DOMAIN + '/siteMsg/readOne', {
        userMsgId: '$userMsgId'
      }),
      readAllMsg: $resource(DEFAULT_DOMAIN + '/siteMsg/readAll', {}),
      deleteOneMsg: $resource(DEFAULT_DOMAIN + '/siteMsg/deleteUserMsg', {
        msgId: '$msgId'
      }),
      pushAllUnpullMessages: $resource(DEFAULT_DOMAIN + '/siteMsg/pushAllUnpullMessages'),
      getUserReserveRecords: $resource(DEFAULT_DOMAIN + '/siteReserve/getUserReserveRecords', {}),
      reserveCancel: $resource(DEFAULT_DOMAIN + '/siteReserve/reserveCancel', {
        reserveOrderId: '@reserveOrderId',
        projectId: '@projectId'
      }),

      // 债权相关
      getCreditRightStatistics: $resource(DEFAULT_DOMAIN + '/siteCredit/getCreditRightStatistics'),
      getCreditRightStat: $resource(RESTFUL_DOMAIN + '/users/0/investments/typeStat',
        {
        'query': {method:'GET', isArray:true},
      }),
      getHeldInCreditRightList: $resource(DEFAULT_DOMAIN + '/siteCredit/getHeldInCreditRightList'),
      getTranferCreditRightList: $resource(DEFAULT_DOMAIN + '/siteCredit/getTranferCreditRightList', {
        status: '@status'
      }),
      transferToPlatform: $resource(DEFAULT_DOMAIN + '/yeepay/transferToPlatform', {
        transferAmount: '@transferAmount'
      }),

      getCreditDetail: $resource(DEFAULT_DOMAIN + '/siteCredit/getCreditDetail', {
        status: '@status',
        number: '@number'
      }),
      autoReinvest: $resource(DEFAULT_DOMAIN + '/siteFunds/fundsRepeatInvest', {
        repeat: '@repeat',
        creditRightId: '@creditRightId'
      }),
      putCreditRightInPool: $resource(DEFAULT_DOMAIN + '/siteCredit/putCreditRightInPool', {
        creditRightId: '@creditRightId'
      }),
      userExperienceDeals: $resource(DEFAULT_DOMAIN + '/siteUser/userExperienceDeals', {
        page : '@page',
        pageSize : '@pageSize',
        status : '@status'
      }),
      getUserIncreaseRateCouponStatis: $resource(DEFAULT_DOMAIN + '/siteUser/getUserIncreaseRateCouponStatis'),
      userIncreaseRateCoupons : $resource(DEFAULT_DOMAIN + '/siteUser/userIncreaseRateCoupons', {
        page : '@page',
        pageSize : '@pageSize',
        status : '@status'
      }),
      getUserCashCouponsStat: $resource(RESTFUL_DOMAIN + '/cashCoupons/stat'),
      cashCouponStatis: $resource(RESTFUL_DOMAIN + '/users/0/cashCoupon'),
      userCashCoupons: $resource(RESTFUL_DOMAIN + '/cashCoupons', {
        page: '@page',
        pageSize: '@pageSize',
        status : '@status'
      }),
      cgtActive: $resource(RESTFUL_DOMAIN + '/userAuths/cgtActive', {}, {
        'active':   {method:'POST'}
      }),
      resetMobile: $resource(RESTFUL_DOMAIN + '/users/0/resetMobile', {
        mobile:'@mobile',
        captcha:'@captcha'
      }, {
        'post':   {method:'POST'}
      }),
      //获取用户已绑定卡限额信息
      getBankRechargeLimit: $resource(DEFAULT_DOMAIN + '/bank/getBankRechargeLimit', {
        bankCode:'@bankCode',
        payCompany:'@payCompany'
      }),
      //获取单笔充值限额信息
      // getUserRechargeRemainLimit: $resource(DEFAULT_DOMAIN + '/bank/getUserRechargeRemainLimit', {
      //   userId:'@userId',
      //   payCompany:'@payCompany'
      // }),/hongcai/rest/bankcard/rechargeRemainLimit
      getUserRechargeRemainLimit: $resource(RESTFUL_DOMAIN + '/bankcard/rechargeRemainLimit', {
        userId:'@userId'
      }),
      //个人中心-债权管理
      //可转让债权列表
      assignmentsTransferablesList: $resource(RESTFUL_DOMAIN + '/users/transferables', {
        page: '@page', 
        pageSize: '@pageSize'
      }),
      //已转让债权列表
      assignmentsList: $resource(RESTFUL_DOMAIN + '/users/0/assignments', {
        page: '@page', 
        pageSize: '@pageSize',
        status: '@status'
      }),
      //撤销中
      cancelAssignment: $resource(RESTFUL_DOMAIN + '/users/0/assignments/:number/revokeValidate', {}, {
        update: {
          method: 'GET',
          params: {
            number: '@number'
          }
        } 
      }),
      //确认撤销
      deleteAssignment: $resource(RESTFUL_DOMAIN + '/users/0/assignments/:number', {}, {
        update: {
          method: 'DELETE',
          params: {
            number: '@assignmentNumber'
          }
        } 
      }),
      
      //转让页面
      assignmentsTransfer: $resource(RESTFUL_DOMAIN + '/creditRights/:number/assign', {
        number: '@number',
        creditRightId:'@creditRightId',
        amount:'@amount',
        discountScale:'@discountScale'
      }, {
        'post': {method:'POST'}
      }),
      assignmentCreditDetail: $resource(RESTFUL_DOMAIN + '/creditRights/:number/creditDetail',{
        number: '@number'
      }),
      assignmentRule: $resource(RESTFUL_DOMAIN + '/assignments/assignmentRule',{}),
      //债权转让统计
      assignmentsCount: $resource(RESTFUL_DOMAIN + '/users/0/assignments/stat',{}),

      getAssignmentsDetail: $resource(RESTFUL_DOMAIN + '/creditRights/0/assignments', {number: '@number'},
        {
        'get': {
          method:'GET',
          isArray: false  
        }
      }),

      //债权管理-(可、中、已)转让列表获取原项目number
      getPreprPojectNumber: $resource(RESTFUL_DOMAIN + '/projects/:projectId/detail',{
        projectId: '@projectId'
      }),
      //个人中心我的投资-债权详情
      getCreditRightBills: $resource(RESTFUL_DOMAIN + '/creditRights/:number/creditRightBills', {number: '@number'},
       {
        'get': {
          method: 'GET'
        }
      }),
      //自动投标开启、编辑
      autoTenders: $resource(RESTFUL_DOMAIN + '/autoTenders', 
        {
          userId: '@userId',
          minInvestAmount: '@minInvestAmount',
          minRemainDay: '@minRemainDay',
          maxRemainDay: '@maxRemainDay',
          annualEarnings: '@annualEarnings',
          investType: '@investType',
          remainAmount: '@remainAmount',
          startTime: '@startTime',
          endTime: '@endTime'
        },
        {
        'post': {
          method: 'POST',
        }
      }),
      //取消投资人自动投标授权
      cancelUserAuthorization: $resource(RESTFUL_DOMAIN + '/users/:userId/userAuths/cancelUserAuthorization', 
        {
          userId: '@userId',
          device: '@device'
        },
        {
        'post': {
          method: 'POST',
        }
      }),
      //自动投标详情:
      autoTender : $resource(RESTFUL_DOMAIN + '/users/:userId/autoTender',{
        userId: '@userId'
      }),
      //禁用自动投标:
      disabledAutoTender : $resource(RESTFUL_DOMAIN + '/users/:userId/disabledAutoTender',{}, {
        update: {
          method: 'PUT',
          params: {
            userId: '@userId',
            status: '@status'
          }
        } 
      }),
      /**
      *风险测评-状态
      **/
      recentlyQuestionnaire: $resource(RESTFUL_DOMAIN + '/users/:userId/recentlyQuestionnaire',{userId: '@userId'}),
      //风险测评题目详情:
      getQuestionnaire: $resource(RESTFUL_DOMAIN + '/users/:userId/getQuestionnaire',{
        userId: '@userId',
        surveyType: '@surveyType'
      },{
        'get': {
          method: 'GET',
          isArray: true
        }
      }), 
      //风险测评问卷提交:
      questionnaire: $resource(RESTFUL_DOMAIN + '/users/:userId/questionnaire',{
        userId: '@userId',
        surveyType: '@surveyType',
        answerJson: '@answerJson'
      }, {
        'post': {method:'POST'}
      }), 
      //订单详情
      orderDetail: $resource(RESTFUL_DOMAIN + '/orders/:orderNumber',{
        orderNumber: '@orderNumber'
      }),
      //交易记录统计
      dealData: $resource(RESTFUL_DOMAIN + '/users/0/deals/stat',{},{
        'get': {
          method: 'GET',
          isArray: true
        }
      }),
      privilegedCapital: $resource(RESTFUL_DOMAIN + '/privilegedCapitals/',{}),
      privilegedCapitalDetails: $resource(RESTFUL_DOMAIN + '/privilegedCapitals/details', {page: '@page',pageSize: '@pageSize'},
       {
        'get': {
          method: 'GET',
          isArray: false  
        }
      }),
      unbindBankCardApply: $resource(RESTFUL_DOMAIN + '/users/0/unbindBankCardApply',{}),
      //账户总览 回款日历
      repaymentPlan: $resource(RESTFUL_DOMAIN + '/accounts/0/repayment/plan', {
        dateTime: '@dateTime'
      }),
      // 账户总览 已收收益曲线
      getReceivedProfitGraphs: $resource(RESTFUL_DOMAIN + '/accounts/0/receivedProfitGraphs', {
        startTime: '@startTime',
        endTime: '@endTime'
      }),
      // 账户总览 每日收益曲线
      getDayProfitGraphs: $resource(RESTFUL_DOMAIN + '/accounts/0/dayProfitGraphs', {
        startTime: '@startTime',
        endTime: '@endTime'
      }),
      //账户总览 昨日收益
      yestodayProfit: $resource(RESTFUL_DOMAIN + '/accounts/0/yestodayProfit',{}),
      //修改交易密码
      resetPayPassword: $resource(RESTFUL_DOMAIN + '/userAuths/resetPayPassword',{

      }, {
        'post': {method:'POST'}
      }),
      // 可提现金额查询
      availableCash: $resource(RESTFUL_DOMAIN + '/users/0/availableCash',{
      }),
      // 本月可免费提现次数查询
      freeWithdrawCount: $resource(RESTFUL_DOMAIN + '/users/0/freeWithdrawCount',{
      }),
      projectPrepaymentTime: $resource(RESTFUL_DOMAIN + '/users/0/creditRights/projectPrepaymentTime',{}),
      // 获取本月还款日期
      repaymentDates: $resource(RESTFUL_DOMAIN + '/projectFullBills/repaymentDates',{
        userId:'@userId',
        startTime:'@startTime',
        endtTime:'@endtTime'
      }, {
        'get': {
          method: 'GET',
          isArray: true
        }
      }),
      // 月度/当日数据统计
      calendarData: $resource(RESTFUL_DOMAIN + '/projectFullBills/calendarData',{
        userId:'@userId',
        startTime:'@startTime',
        endtTime:'@endtTime'
      }, {
        'get': {
          method: 'GET'
        }
      }),
      // 预计/待收回款详情查询 --- 1.预计回款、2.待收回款、3.已收回款
      repaymentDetails: $resource(RESTFUL_DOMAIN + '/projectFullBills/repaymentDetails',{
        userId:'@userId',
        startTime:'@startTime',
        endtTime:'@endtTime',
        type: '@type'
      }, {
        'get': {
          method: 'GET'
        }
      }),
      serverTime: $resource(RESTFUL_DOMAIN + '/systems/serverTime', {})
    };
  });
