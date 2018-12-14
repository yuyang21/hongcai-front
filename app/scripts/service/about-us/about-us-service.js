'use strict';
angular.module('hongcaiApp')
  .factory('AboutUsService', function($resource, DEFAULT_DOMAIN, RESTFUL_DOMAIN) {
    return {
      indexTextList: $resource(DEFAULT_DOMAIN + '/siteText/indexTextList', {
        category: '@category'
      }),
      textList: $resource(DEFAULT_DOMAIN + '/siteText/getTextList', {
        category: '@category'
      }),
      getLatestNotice: $resource(DEFAULT_DOMAIN + '/siteText/getLatestNotice'),
      textDetail: $resource(DEFAULT_DOMAIN + '/siteText/getTextDetail', {
        textId: '@textId'
      }),
      dataStat: $resource(RESTFUL_DOMAIN + '/disclosureInfo/newest', {
        dataTime: '@dataTime'
      }),
      loanInfo: $resource(RESTFUL_DOMAIN + '/disclosureInfo/loanInfo/:id', {
        id : '@id'
      })
    };
  });
