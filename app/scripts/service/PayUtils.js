'use strict';
angular.module('hongcaiApp')
  .factory('PayUtils', function($rootScope, config) {
    return {

      newForm: function() {
        var f = document.createElement('form');
        document.body.appendChild(f);
        f.method = 'post';
        // f.target = '_blank';
        return f;
      },

      createElements: function(eForm, eName, eValue) {
        var e = document.createElement('input');
        eForm.appendChild(e);
        e.type = 'text';
        e.name = eName;
        if (!document.all) {
          e.style.display = 'none';
        } else {
          e.style.display = 'block';
          e.style.width = '0px';
          e.style.height = '0px';
        }
        e.value = eValue;
        return e;
      },

      /**
       * 跳转到托管方
       */
      redToTrusteeship: function(business, encrpyMsg){
          if(config.pay_company === 'yeepay'){
            var req = encrpyMsg.req;
            var sign = encrpyMsg.sign;
            var _f = this.newForm();
            this.createElements(_f, 'req', req);
            this.createElements(_f, 'sign', sign);
            _f.action = config.YEEPAY_ADDRESS + business;
            _f.submit();
          } else if (config.pay_company === 'cgt'){
            var serviceName = encrpyMsg.serviceName;
            var platformNo = encrpyMsg.platformNo;
            var userDevice = encrpyMsg.userDevice;
            var reqData = encrpyMsg.reqData;
            var keySerial = encrpyMsg.keySerial;
            var sign = encrpyMsg.sign;
            var _f = this.newForm();
            this.createElements(_f, 'serviceName', serviceName);
            this.createElements(_f, 'platformNo', platformNo);
            this.createElements(_f, 'userDevice', userDevice);
            this.createElements(_f, 'reqData', reqData);
            this.createElements(_f, 'keySerial', keySerial);
            this.createElements(_f, 'sign', sign);
            _f.action = config.CGT_ADDRESS;
            _f.submit();
          }
      }

    };
  });
