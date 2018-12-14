'use strict';
angular.module('hongcaiApp')
  .controller('UserCenterCtrl', function($location, $scope, $http,$state, $rootScope, $stateParams, UserCenterService, SecuritySettingService, DEFAULT_DOMAIN, $alert, toaster, $upload,  $window, PayUtils) {
    
    $scope.headImgUrl = '/images/user-center/portrait.png';
    $rootScope.selectPage = $location.path().split('/')[2];
    var timestamp = new Date();
    var welcomeTime = timestamp.getHours();
    if (welcomeTime > 5 && welcomeTime < 9) {
      $scope.welcomeTip = '早安~';
    } else if (welcomeTime >= 9 && welcomeTime <= 11) {
      $scope.welcomeTip = '上午好~';
    } else if (welcomeTime >= 12 && welcomeTime <= 14) {
      $scope.welcomeTip = '中午好~';
    } else if (welcomeTime >= 15 && welcomeTime <= 18) {
      $scope.welcomeTip = '下午好~';
    } else {
      $scope.welcomeTip = '晚安~';
    }

    if(['record', 'assets-overview', 'recharge', 'withdraw'].indexOf($rootScope.selectPage) !== -1){
      // $('#accountInfo').collapse('toggle')
      $('#capitalInfo').addClass('in');
    } else if (['credit', 'investment', 'reservation', 'assignments'].indexOf($rootScope.selectPage) !== -1){
      $('#investInfo').addClass('in');
    } else if (['experienceMoney', 'rate-coupon', 'invite-rebate','cash-coupon'].indexOf($rootScope.selectPage) !== -1){
      $('#rewardInfo').addClass('in');
    } else if (['message'].indexOf($rootScope.selectPage) !== -1){
      $('#sysInfo').addClass('in');
    } else {
      $('#accountInfo').addClass('in');
    }

    $scope.getUserInfo = function () {
      /**
      * 账号信息
      **/
      UserCenterService.userSecurityInfo.get({}, function(response) {
        if (response && response.ret !== -1) {
          var userAuth = response.data.userAuth;
          var user = response.data.user;
          $scope.email = user.email;
          $scope.mobile = user.mobile;
          $scope.userId = user.id;
          if (userAuth && userAuth.authStatus === 2) {
            $scope.haveTrusteeshipAccount = true;
            // $scope.openTrustReservation = userAuth.autoTransfer;
          } else {
            $scope.haveTrusteeshipAccount = false;
          }

        } 
      });

      /**
      * 绑卡信息
      **/
      UserCenterService.getUserBankCard.get({}, function(response) {
        if (response.ret === 1) {
          var card = response.data.card;
          if (card) {
            $scope.haveCard = (card.status === 'VERIFIED');
            $scope.bankName = card.openBank;
            $scope.cardNo = card.cardNo;
            $scope.isVerifying = (card.status === 'VERIFYING');
            $scope.unbinding = (card.status === 'INIT');
          } else {
            $scope.haveCard = false;
            $scope.isVerifying = false;
            $scope.unbinding = false;
          }
          $scope.isAuth = response.data.isAuth;
        } else {
          toaster.pop('error', response.msg);
        }
      });
    }
    $rootScope.isLogged ? $scope.getUserInfo() : null;
    //修改手机号
    $scope.resetMobile = function(){
      
      if($scope.haveTrusteeshipAccount== true){
        SecuritySettingService.setter({reset:true});
        $state.go('root.userCenter.security-settings');
      }else{
        $rootScope.toRealNameAuth();

      }
    }
    // 点击开通存管通
    $scope.openTrusteeshipAccount = function(){
      SecuritySettingService.setter({realName:true});
      $state.go('root.userCenter.security-settings');
    };

    //绑定银行卡
    $scope.bindBankCard = function() {
      // $rootScope.toNotice();
      if($rootScope.securityStatus.realNameAuthStatus !== 1){
        $rootScope.toRealNameAuth();
        return;
      }
      $scope.msg = '5';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });
      window.open('/#!/bankcard-transfer/0');
    };
    $scope.alertAvater = function() {
      $alert({
        scope: $scope,
        template: 'views/modal/modal-avater.html',
        show: true
      });
    };
    // 保存
    $scope.submit = function() {
        var image = $('#cropImg>img');
        var type = image.attr('src').split(';')[0].split(':')[1];
        var fileName = $('#avatarInput').prop('files')[0].name;
        var canVas = image.cropper("getCroppedCanvas", {});
        //将裁剪的图片加载到face_image
        $('#face_image').attr('src', canVas.toDataURL());
        canVas.toBlob(function(blob) {
            var formData = new FormData();
            formData.append("file", blob, fileName);
            $.ajax({
                type: "POST",
                url:  DEFAULT_DOMAIN + '/siteUser/uploadFile' 
                + '?categoryId='+ $rootScope.loginUser.id  
                + '&category=7'
                + '&fileType=0'
                + '&archiveType=6'
                + '&description=头像',
                data: formData,
                contentType: false, //必须
                processData: false, //必须
                dataType: "json",
                success: function(retJson){
                    //清空上传文件的值
                    $('#avatarInput').val('');
                     $scope.headerUrl = $rootScope.baseFileUrl + retJson.data.user.portraitUrl;
                     toaster.pop('success','上传成功');  
                     $state.go('root.userCenter.account-overview');
                    //上传成功
                    // console.log('retJson:', retJson);
                },
                error : function() {
                    //清空上传文件的值
                    $('#avatarInput').val('');
                }
            });
        }, type);
    };

    //上传头像
    
    var onFileSelect = function(files) {
        var file = files[0];
        if(file == undefined) {
          toaster.pop('error','请选择一张图片'); 
          return;
        }
        var image = $('#cropImg>img');
        var canVas = image.cropper("getCroppedCanvas", {});
        $scope.upload = $upload.upload({
            url: DEFAULT_DOMAIN + '/siteUser/uploadFile' 
            + '?categoryId='+ $rootScope.loginUser.id  
            + '&category=7'
            + '&fileType=0'
            + '&archiveType=6'
            + '&description=头像', 
            data: {myObj: $scope.myModelObj},
            file: file,
        }).progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
            $('#face_image').attr('src', canVas.toDataURL());
            // $scope.headerUrl = $rootScope.baseFileUrl + data.data.user.portraitUrl;
            toaster.pop('success','上传成功');  
            $state.go('root.userCenter.account-overview');
        });
   
    };
    // 保存
    $scope.saveAvater = function() {
      onFileSelect($('#avatarInput').prop('files'));
    }
        
    //修改交易密码
    $scope.resetPayPwd = function() {
      UserCenterService.resetPayPassword.post({}, function(response) {
        if (response && response.ret !== -1) {
          PayUtils.redToTrusteeship('resetPayPassword', response);
        }
      })
    }

  });
