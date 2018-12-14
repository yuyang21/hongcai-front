'use strict';
angular.module('hongcaiApp')
  .factory('CreditService', function($resource, $location, DEFAULT_DOMAIN,RESTFUL_DOMAIN) {
    return {
      getCreditAssignmentList: $resource(DEFAULT_DOMAIN + '/siteCredit/getCreditAssignmentList', {
        minTransferAmount:'@minTransferAmount' ,
        maxTransferAmount:'@maxTransferAmount' ,
        minCycle:'@minCycle' ,
        maxCycle:'@maxCycle',
        minEarning:'@minEarning',
        maxEarning:'@maxEarning',
        minTotalAmount:'@minTotalAmount',
        maxTotalAmount:'@maxTotalAmount',
        sortCondition:'@sortCondition',
        sortType:'@sortType'
      }),
      creditAssignmentDetail: $resource(DEFAULT_DOMAIN + '/siteCredit/creditAssignmentDetail', {
        assignmentNumber:'@assignmentNumber'
      }),
      subscribeCreditRight: $resource(DEFAULT_DOMAIN + '/siteCredit/subscribeCreditRight', {
        assignmentNumber:'@assignmentNumber',
        subscribeAmount: '@subscribeAmount'
      }),
      getCreditAssignment: $resource(RESTFUL_DOMAIN + '/assignments/:number',{
        number:'@number'
      })
     
    };
  });
