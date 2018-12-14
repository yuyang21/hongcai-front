'use strict';
angular.module('hongcaiApp')
  .factory('YeepayService', function($resource, DEFAULT_DOMAIN) {
    return {
      yeepayRegister: $resource(DEFAULT_DOMAIN + '/yeepay/register', {
        realName: '@realName',
        idNo: '@idNo'
      }),
    };
  });
