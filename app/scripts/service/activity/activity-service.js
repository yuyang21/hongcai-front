'use strict';
angular.module('hongcaiApp')
  .factory('ActivityService', function($resource, $location, DEFAULT_DOMAIN) {
    return {

      /**
       * 投资返现活动排行榜
       * @type {[type]}
       */
      investReturnRank: $resource(DEFAULT_DOMAIN + '/activity/investReturnRank', {})
      ,

     
    };
  });
