'use strict';
angular.module('hongcaiApp')
  .factory('OrderService', function ($resource, DEFAULT_DOMAIN, RESTFUL_DOMAIN) {
    return {
      investVerify: $resource(DEFAULT_DOMAIN + '/siteOrder/investVerify', {projectId: '@projectId',amount: '@amount'}),
      investVerifyFunds: $resource(DEFAULT_DOMAIN + '/siteOrder/investVerifyFunds', {projectId: '@projectId',amount: '@amount', isRepeat: '@isRepeat'}),
      hongbaoVerify: $resource(DEFAULT_DOMAIN + '/siteOrder/investVerify', {projectId: '@activityId',amount: '@amount'}),
      transfer: $resource(DEFAULT_DOMAIN + '/yeepay/transfer', {projectId: '@projectId', orderId: '@orderId'}),
      statisticsByUser: $resource(DEFAULT_DOMAIN + '/siteOrder/statisticsByUser', {orderId: '@orderId'}),
      getOrderListByProject: $resource(DEFAULT_DOMAIN + '/siteOrder/getOrderListByProject', {projectId: '@projectId'}),
      saveOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/saveOrder', {projectId: '@projectId', investAmount: '@investAmount', giftCount: '@giftCount', inviteMobile: '@inviteMobile', couponNumber: '@couponNumber'}),
      saveFundsOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/saveFundsOrder', {projectId: '@projectId', amount: '@amount', isRepeat: '@isRepeat', payAmount: '@payAmount', couponNumber: '@couponNumber'}),
      saveHongYunOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/saveHongYunOrder', {projectId: '@projectId', investAmount: '@investAmount'}),
      saveTuhaoOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/saveTuhaoOrder', {projectId: '@projectId', investAmount: '@investAmount'}),
      transferFunds: $resource(DEFAULT_DOMAIN + '/yeepay/transferFunds', {projectId: '@projectId', orderId: '@orderId'}),
      saveExperienceMoneyOrder: $resource(DEFAULT_DOMAIN + '/siteOrder/saveExperienceMoneyOrder', {projectId: '@projectId', amount: '@amount', isRepeat: '@isRepeat', payAmount: '@payAmount'}),

      /**
       * 订单合同下载
       * @type {[type]}
       */
      downloadContract: $resource(DEFAULT_DOMAIN + '/siteOrder/downloadContract', {
        projectId: '@projectId', amount: '@amount', isRepeat: '@isRepeat', payAmount: '@payAmount'
      }),
      downloadContractFdd: $resource(RESTFUL_DOMAIN + '/contracts/0/fdd', {
        orderNumber: '@orderNumber'
      }),
      downloadAssignmentContract: $resource(RESTFUL_DOMAIN + '/contracts/0/assignment', {
        orderNumber: '@orderNumber'
      }),
      getUnUsedIncreaseRateCoupons: $resource(DEFAULT_DOMAIN + '/siteOrder/getUnUsedIncreaseRateCoupons',{projectId : '@projectId', amount : '@amount'}),
      //认购下单
      investAssignment: $resource(RESTFUL_DOMAIN + '/assignments/:number/orders', {
        number: '@number',
        amount: '@amount',
        device: '@device'
      },{
        'POST': {
          method:'POST'
        }
      }),
      //下单成功
      transferAssignment: $resource(RESTFUL_DOMAIN + '/orders/:number/users/0/payment', {
        number: '@number'
      }, {
        'POST': {
          method: 'POST'
        }
      }),
      //未支付订单
      unFinishedOrder: $resource(RESTFUL_DOMAIN + '/orders/unpay', {})
    };
  });
