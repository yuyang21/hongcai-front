'use strict';
angular.module('hongcaiApp')
  .controller('MessageCtrl', function($location, $scope, toaster, $state, $rootScope, $stateParams, UserCenterService) {
    $rootScope.pageTitle = '站内信-宏财网';
    $scope.toggleMessage = function($index){
      $scope.toggleIndex = $index;
      var index = $index;
      $('.list-group-item').siblings().removeClass('bg-grey7').eq(index).addClass('bg-grey7');
      //$('.list-group-item').siblings().find('.collapse').removeClass('in').eq(index);
      // var targetC = $('.list-group-item').eq(index).find('.collapse').hasClass('in');//判断当前是否为打开状态
      // console.log(targetC);
      // if(targetC){
      //   // $('.list-group-item').eq(index).find('.collapse').removeClass('in');
      // }
    }
    // $scope.changeStatus = function(status,id,$event,$index){
    $scope.changeStatus = function(status, id, $index) {
      var index = $index;
      var targetSpan = $('.message-item').eq(index).find('.msg-title');
      if (targetSpan.hasClass('ft-grey666')) {
        targetSpan.removeClass('ft-grey666');
        targetSpan.addClass('ft-grey4');
      } else {
        targetSpan.addClass('ft-grey4');
      }

      if (status === 0) {
        //markSingleMsgRead
        UserCenterService.readOneMsg.get({
          'userMsgId': id
        }, function(response) {
          if (response.ret === 1) {
            UserCenterService.getUnreadMsgCount.get(function(response) {
              if (response.ret === 1) {
                $rootScope.unreadCount = response.data.unreadCount;
              }
            });
          } else {
            toaster.pop('error', response.msg);
          }
        });

        targetSpan.removeClass('ft-grey666');

      }
    };

    $scope.currentPage = 1;
    $scope.pageSize = 12;
    $scope.status = $stateParams.status;
    //打开消息关闭其他
    $scope.openMsg = function ($index) {
      var index = $index;
      var targetSpan = $('.message-item').eq(index).find('.item-discrip');
      var targetTime = $('.message-item').eq(index).find('.msg-time');
      var targetDelete = $('.message-item').eq(index).find('.msg-delete');
      // $scope.isDelete = !$scope.isDelete;
      if(targetSpan.hasClass('display-no')){
        $('.message-item').find('.item-discrip').addClass('display-no');
        $('.message-item').find('.msg-time').removeClass('display-no');
        $('.message-item').find('.msg-delete').addClass('display-no');
        targetSpan.removeClass('display-no');
        targetTime.addClass('display-no');
        targetDelete.removeClass('display-no');
        $scope.isDelete = !$scope.isDelete;
      } else {
        targetDelete.addClass('display-no');
        targetTime.removeClass('display-no');
        targetSpan.addClass('display-no');
        $scope.isDelete = !$scope.isDelete;
      }
    }
    

    /**
     * 加载更多
     */
    $scope.loadPage = function(page, pageSize, status){

      UserCenterService.getUserMsgByStatus.get({
        status: status,
        page: page,
        pageSize: pageSize
      }, function(response) {
        if (response.ret === 1) {
          $scope.currentPage = page;
          $scope.pageSize = pageSize;
          $scope.status = status;

          $scope.count = response.data.count;
          $scope.orderProp = 'id';
          $scope.data = response.data.userMsgList;
          $scope.numberOfPages = function() {
            return Math.ceil($scope.count / $scope.pageSize);
          };
        }
      });

    }

    $scope.loadPage($scope.currentPage, $scope.pageSize, $stateParams.status);

    /**
     * 删除某条信息
     */
    $scope.deleteMsg = function(id){
      UserCenterService.deleteOneMsg.get({
        'msgId': id
      }, function(response) {
        if(response.ret === 1){
          $scope.deleteInfo = true;
          toaster.pop('success', '恭喜您，删除成功！');
          // window.location.reload();
          $scope.loadPage($scope.currentPage, $scope.pageSize, $stateParams.status);
        }
      });
    }

    //markAllMsgRead
    $scope.updateAllMsgStatus = function() {
      UserCenterService.readAllMsg.get({}, function(response) {
        if (response.ret === 1) {
          angular.element('li[class]').removeClass('unread-flag');
          UserCenterService.getUnreadMsgCount.get(function(response) {
            if (response.ret === 1) {
              $rootScope.unreadCount = response.data.unreadCount;
              $state.go('root.userCenter.message',{status:'1'});
            }
          });
        } else {
          toaster.pop('error', response.msg);
        }
      });
    };

  });
