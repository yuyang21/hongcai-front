'use strict';
angular.module('hongcaiApp')
  .factory('RegisterService', function($resource, DEFAULT_DOMAIN) {
    return {
      saveRegister: $resource(DEFAULT_DOMAIN + '/siteUser/register', {}, {
        save: {
          method: 'POST',
          params: {
            name: '@name',
            type: '@type',
            account: '@account',
            password: '@password',
            captcha: '@captcha',
            picCaptcha: '@picCaptcha',
            inviteCode: '@inviteCode',
            from: '@from',
            act: '@act',
            guestId : '@guestId'
          }
        }
      }),
      loadPageRegister: $resource(DEFAULT_DOMAIN + '/siteUser/loadPageRegister', {}, {
        save: {
          method: 'POST',
          params: {
            name: '@name',
            type: '@type',
            account: '@account',
            password: '@password',
            captcha: '@captcha',
            from: '@from',
            act: '@act',
            guestId : '@guestId'
          }
        }
      }),
      activeEmail: $resource(DEFAULT_DOMAIN + '/siteUser/activeEmail', {
        etoken: '@etoken'
      }, {})
    };
  });
