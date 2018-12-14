'use strict';
angular.module('hongcaiApp')
  .factory('checkPwdUtil', function() {
    return {
      getStrength: function (newVal, oldVal) {
        var strength = 1;
        // 密码强度验证
        // var pattern1 = /^[0-9a-zA-Z]{6,10}$/; //包括数字和字母 6-10位
        var pattern2 = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{11,}$/; //数字和字母11位以上
        var pattern3 = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*)[0-9A-Za-z]{6,}$/ // 数字，字母大小写，6位以上
        var pattern4 = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,}$/  //数字字母符号
        var pattern5 = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])[0-9A-Za-z]{11,}$/ //数字和字母大小写11位以上
        var pattern6 = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*].{10,}$/ //数字字母符号11位以上
        // if (newVal && newVal.length < 6 || newVal && pattern1.test(newVal) || /^\d{6,}$/.test(newVal) || /^[a-zA-Z]{6,}$/.test(newVal) || /^[a-zA-Z~!@#$%^&*].{0,}$/.test(newVal)) {
        //   strength = 1;
        // }
        if(!newVal) {
          strength = 0
        }
        if (pattern2.test(newVal) || pattern3.test(newVal) || pattern4.test(newVal)) {
          strength = 2;
        }
        if (pattern5.test(newVal) || pattern6.test(newVal)) {
          strength = 3;
        }
        return strength;
      }
    }
  })
