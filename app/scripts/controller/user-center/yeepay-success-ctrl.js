'use strict';
angular.module('hongcaiApp')
  .controller('YeepaySuccessCtrl', function(ipCookie, $scope, $stateParams, ProjectService, $state, $rootScope, UserCenterService, $location) {

  	var business = $stateParams.business;
  	$scope.amount = $stateParams.amount;
    $scope.profit = $stateParams.profit;
  	var page = 1;

  	if (business === 'PERSONAL_REGISTER'){
  		page == 1;
  	} else if (business == 'RESET_MOBILE'){
  		page = 9;
  	} else if (business === 'RECHARGE'){
  		page = 4;
  	} else if (business === 'WITHDRAW'){
  		page = 6;
  	} else if(business === 'UNBIND_BANKCARD'){
  		page = 7;
  	} else if(business === 'BIND_BANK_CARD'){
  		page = 5;
  	} else if (business == 'TRANSFER'){
  		page = 2;
      //订单详情 
      UserCenterService.orderDetail.get({
        orderNumber: $stateParams.number
      }, function(response){
        if (response && response.ret !== -1) {
          ProjectService.prejectDetail.get({
            number: response.projectNumber
          }, function (res) {
            $scope.repaymentType = res.repaymentType
            if($scope.repaymentType === 2){
              UserCenterService.autoTender.get({
                userId: 0
              }, function(resdata){
                //1.开启  2. 过期 3.禁用 0已开启还未到开始日期
                $scope.openTrustReservation = resdata.status;
              })
            }
            if ($stateParams.number) {
              ProjectService.investSuccessCoupons.get({
                orderNumber: $stateParams.number
              }, function (resNum) {
                $scope.usedCoupon = resNum;
              })
            }
          })
        }
      });
  	}else if(business === 'EXPERIENCE'){
      page = 10;
    } else if(business === 'USER_ACTIVE'){
      page = 11;
    } else if(business === 'AUTHORIZATION_AUTO_TRANSFER'){
			if ($location.search().projectNumber != 'undefined') {
				ProjectService.prejectDetail.get({
					number: $stateParams.number
				}, function (response) {
					$state.go('root.project-details',{number: $location.search().projectNumber, type: response.type});
				})
			} else {
				$state.go('root.userCenter.security-settings');
			}
      ipCookie('modal', 1);
    } else if(business === 'RESET_PASSWORD'){
      page = 13;
    }

  	$scope.page = page;

    //开通自动投标
    $scope.openReservation = function() {
      var act = function () {
        if ($rootScope.securityStatus.autoTransfer === 0){
          var user = {
            'realName': 'default',
            'idCardNo': 'default'
          };

          window.open('/#!/righs-transfer/' + user.realName + '/' + user.idCardNo + '/1');
          $rootScope.goToTender();
          return;
        }else {
          $state.go('root.userCenter.security-settings');
          ipCookie('modal', 1);
        }
      }
      $rootScope.migrateStatus(act);
    };

  });
