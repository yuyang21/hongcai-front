'use strict';
angular.module('hongcaiApp')
  .factory('FriendLinkService', function($resource, DEFAULT_DOMAIN) {
    return {
      friendLinkList: $resource(DEFAULT_DOMAIN + '/siteTrafficStats/friendLinkList', {
        
      }) 
    };
  });
