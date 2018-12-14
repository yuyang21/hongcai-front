"use strict";
hongcaiApp.factory('VouchersService', function($resource, $location, DEFAULT_DOMAIN, RESTFUL_DOMAIN) {
  return {
    inviteStat: $resource(DEFAULT_DOMAIN + '/vouchers/inviteStat', {}),


    getInviteList: $resource(RESTFUL_DOMAIN + '/users/0/inviteList', {
    	page: '@page',
    	pageSize: '@pageSize'
    }),
    inviteVoucher: $resource(RESTFUL_DOMAIN + '/users/0/voucher', {}),
  };
});
