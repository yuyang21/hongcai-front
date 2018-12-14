/*
* @Author: yuyang
* @Date:   2016-10-11 14:17:33
* @Last Modified by:   yuyang
* @Last Modified time: 2016-10-11 17:51:19
*/

'use strict';
angular.module('hongcaiApp')
  .directive('capchaCountdown', function(UserCenterService, toaster, ipCookie) { //定义指令时的名称用驼峰命名，使用时用中划线方式
    return {
      restrict: 'EA',
      scope: false,
      link: function(scope, elem, attrs) {

        function capchaCountdown() {
          if (!scope.user.mobile || !scope.mobilePattern.test(scope.user.mobile) || !scope.user.picCaptcha) {
            return;
          }
          UserCenterService.sendMobileCaptcha.save({
            picCaptcha: scope.user.picCaptcha,
            mobile: scope.user.mobile,
            business: scope.userbusiness,
            guestId: ipCookie('guestId')
          }, function(response) {
            if (response.ret !== -1) {
              scope.refreshCode();
              // $scope.user.picCaptcha = undefined;
              toaster.pop('success', '短信验证码发送成功，请查收');
              countDown();
            } else {
              scope.showPicCaptchaError = true;
              toaster.pop('warning', '发送失败，' + response.msg);
            }
          });
          var second = 60;

          function countDown() {
            // 如果秒数还是大于0，则表示倒计时还没结束
            if (second >= 0) {
              // 倒计时不结束按钮不可点
              attrs.$$element[0].disabled = true;
              elem[0].innerHTML = null;
              elem[0].innerHTML = second + "s后重试";
              // elem[0].className = '';
              // 时间减一
              second -= 1;
              // 一秒后重复执行
              setTimeout(function() {
                countDown(elem[0]);
              }, 1000);
              // 否则，按钮重置为初始状态,可点击
            } else {
              // elem[0].className = '';
              elem[0].innerHTML = "发送验证码";
              second = 60;
              attrs.$$element[0].disabled = false;
            }

          }
        }
        elem.on('click', capchaCountdown);
      }
    }
  })
