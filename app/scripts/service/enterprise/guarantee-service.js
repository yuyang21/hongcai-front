'use strict';
angular.module('hongcaiApp')
  .factory('GuaranteeService', function($resource, $location, DEFAULT_DOMAIN) {
    return {
      guaranteeList: $resource(DEFAULT_DOMAIN + '/siteProject/guaranteeList'),
    };
  });
