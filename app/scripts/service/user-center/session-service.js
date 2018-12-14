'use strict';
angular.module('hongcaiApp')
  .factory('SessionService', function($http, $resource, $location, DEFAULT_DOMAIN, $state) {
    return {
      set: function(key, value) {
        return sessionStorage.setItem(key, value);
      },
      get: function(key) {
        return sessionStorage.getItem(key);
      },
      destory: function(key) {
        $http.post(DEFAULT_DOMAIN + '/siteUser/destorySession').then(function(response) {
          if (response.data.ret !== -1 && response.data.msg === 'success') {
            $state.go('root.login');
            return sessionStorage.removeItem(key);
          }
        });
      }
    };
  });
