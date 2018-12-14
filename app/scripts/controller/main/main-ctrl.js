'use strict';
angular.module('hongcaiApp')
  .controller('MainCtrl', function($scope, $state, $rootScope, $location, $modal, MainService, AboutUsService, ProjectService, ProjectUtils, FriendLinkService, DateUtils, toaster, projectStatusMap) {
    $scope.spCountDown = -1;
    $scope.jingxuanLimit = 3;
    $scope.isExist = true;
    $scope.authorization = false;
    $scope.newBieNum = '';
    $scope.jingxuan = [];
    $scope.isJinxuanNewbie = false;
    $rootScope.pageTitle = '宏财网-值得信赖的P2P网贷平台';
    var userId = $rootScope.loginUser ? $rootScope.loginUser.id : null;
    $scope.projectStatusMap = projectStatusMap;
    

    /**
     * 引导下载app弹窗
     */
    $scope.showQRcode = function () {
      $rootScope.noticeModal = $modal({
        scope: $rootScope,
        template: 'views/modal/alert-novice.html',
        show: true
      }); 
    }
    
    /**
     * 查询新手标  状态码200 有新手标， 204 无新手标项目
     */
    var newbieProject = function () {
      ProjectService.newbieProject.get({}, function (response) {
        if (!response || response.ret === -1) {
          return
        }
        $scope.newbieProject = response
        $scope.newBieNum = response.number
        $scope.jingxuanLimit = !response.number ? 3 : 2
        // 查询精选项目列表
        ProjectService.main_projectList.get({
          pageSize: 4,
          page: 1,
          type: 5
        }, function(response){
          if ( !response || response.ret === -1) {
            toaster.pop('warning', '服务器正在努力的加载....请稍等。');
            return;
          }
          var jingxuan = response.projectList;
          for(var i=0; i < jingxuan.length; i++) {
            if (jingxuan[i].number !== $scope.newBieNum) {
              $scope.jingxuan.push(jingxuan[i])
            }
          }
          // 查询用户是否投资过
          $scope.newBieNum && $rootScope.isLogged && ProjectService.isExist.get({
              userId: userId
            }, function (response) {
            if (!response || response.ret === -1) {
              return
            }
            $scope.isExist = response.exist;
            if ($rootScope.isLogged) {
              // 查询新手标是否授权
              ProjectService.authorization.get({
                number: $scope.newBieNum
              }, function (response) {
                if (!response || response.ret === -1) {
                  return
                }
                $scope.authorization = response.authorization
                //  没有新手标 || 有新手标 && 已登陆 && 老用户 && 未授权 || 有新手标 && 已登陆 && 老用户 && 已授权 && 新手标募集满
                $scope.jingxuanLimit = !$scope.newbieProject.number || $rootScope.isLogged && $scope.isExist && (!$scope.authorization || $scope.newbieProject.amount === 0)? 3 : 2
                // 是否新手标对应的精选项目: 有新手标 && 已登陆 && 老用户 && 已授权 && 新手标未集满
                $scope.isJinxuanNewbie = $scope.newbieProject.number && $rootScope.isLogged && $scope.isExist && $scope.authorization && $scope.newbieProject.amount !== 0 ? true : false
              })
            }
          })
        });
      })
    }
    newbieProject()
    /**
     * 尊贵列表
     */
    $scope.jingxuanList = function(type) {
      $scope.showFlag = 1;
      ProjectService.main_projectList.get({
        pageSize: 3,
        page: 1,
        type: type
      }, function(response){
        if ( !response || response.ret === -1) {
          toaster.pop('warning', '服务器正在努力的加载....请稍等。');
          return;
        }
        $scope.zungui = response.projectList;
      });
    };
    $scope.jingxuanList(6);


    /**
     * 媒体报道
     */
    AboutUsService.indexTextList.get({
      category: 1,
      pageSize: 4
    }, function(response) {
      if (response.ret === 1) {
        $scope.mediaList = response.data.textList;
      }
    });

    /**
     * 宏财研究院
     */
    AboutUsService.indexTextList.get({
      category: 4,
      pageSize: 4
    }, function(response) {
      if (response.ret === 1) {
        $scope.searchList = response.data.textList;
        /**
         * 宏财动态
         */
        AboutUsService.indexTextList.get({
          category: 3,
          pageSize: 4
        }, function(response) {
          if (response.ret === 1) {
            $scope.trendList = response.data.textList;
            for (var i = 0; i <= $scope.trendList.length - 1; i++) {
              $scope.searchList.push($scope.trendList[i]);
            };
            $scope.searchList = $scope.searchList.slice(0, 5);
          }
        });
      }
    });

    $rootScope.selectPage = $location.path().split('/')[1];


    /**
     * 获取最后一个公告
     */
    AboutUsService.getLatestNotice.get(function(response) {
      if (response.ret === 1) {
        $scope.latestNotice = response.data.latestNotice;
      }
    });


    /**
     * 最近30天投资排行
     */
    MainService.monthInvest.get(function(response) {
      $scope.monthInvestList = response.data.investAmounts;
    });

    /**
     * 处理推广流量统计
     */
    if ($rootScope.channelCode) {
      MainService.trafficStats.get({
        from: $rootScope.channelCode
      });
    }

    /**
     * 债权转让列表
     */
    // ProjectService.assignmentList.get({
    //   page:1, 
    //   pageSize: 3
    // },function(response){
    //   if (response.assignments.length <=0) {
    //     return;
    //   }else {
    //     $scope.assignmentList = response.assignments;
    //   }
    // });

  })
