/*
 * @Author: fuqiang1
 * @Date:   2016-07-20 14:55:49
 * @Last Modified by:   fuqiang1
 * @Last Modified time: 2016-07-21 16:04:22
 */

'use strict';
angular.module('hongcaiApp')
  .factory('ProjectUtils', function($interval, $rootScope, DateUtils) {
    return {
      /**
       * 项目倒计时
       */
      projectTimedown: function(project, serverTime) {
        if (!project || project.status !== 6) {
          return;
        }

        project.countDown = project.releaseStartTime - serverTime;
        project._timeDown = DateUtils.toHourMinSeconds(project.countDown);
        project._interval = $interval(function() {
          project.countDown -= 1000;
          if (project.countDown <= 0 && project.status === 6) {
            project.status = 7;
          }
          project._timeDown = DateUtils.toHourMinSeconds(project.countDown);
        }, 1000);
        $rootScope.$on('$stateChangeStart', function() {
          clearInterval(project._interval);
        });
      }

    }

  });
