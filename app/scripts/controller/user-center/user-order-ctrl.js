'use strict';
angular.module('hongcaiApp')
  .controller('UserOrderCtrl', function($location, $scope, $http, $rootScope, $state, $stateParams, UserCenterService, $aside, $window, OrderService, config, toaster, $alert, ProjectService) {

    $scope.typeInvStatus = {
      '0': '未支付',
      '1': '已支付'
    };
    $scope.status = $stateParams.status || 0;
    $scope.dateInterval = $stateParams.dateInterval || 0;
    $scope.type = 0;
    $scope.listInvPond = [];
    $scope.unpaid = 0;
    $scope.paid = 0;
    $scope.currentPage = 1;
    $scope.pageSize = 6;


    $scope.showListNameInfo = function() {
      angular.element('#investment-list').animate({
        width: 'show'
      }, 300);
    };


    $scope.baseFileUrl = function(){
      if($location.protocol() === 'http'){
        return 'http' + config.baseFileUrl.substr(config.baseFileUrl.indexOf("//") - 1);
      } else {
        return 'https' + config.baseFileUrl.substr(config.baseFileUrl.indexOf("//") - 1);
      }
    }



    $scope.generateContractPDF = function(projectId, orderId, status, type) {

      /**
       * 下载模板
       */
      if (status === 2) {
        if (type !== 4 && type !== 2 && type !== 3 ) {
          ProjectService.contractPDFModel.get({
            projectId: projectId
          }, function(response){
            if(response.ret !== -1){
              $scope.downloadPDF($scope.baseFileUrl() + response.data.contractModel.url);
            }
          })

          // $scope.downloadPDF('hongcai/api/v1/siteProject/generateContractPDFModel?orderId=' + orderId + '&projectId=' + projectId);
        } else if (type === 4) {
          $scope.downloadPDF('hongcai/api/v1/siteCredit/downloadFundsContractModel');
        } else if (type === 2 || type === 3) {
          OrderService.downloadAssignmentContract.get({
            orderId: orderId,
            projectId: projectId
          }, function(response){
            if(response.ret !== -1){
              $scope.downloadPDF($scope.baseFileUrl() + response.data.contract.url);
            }
          });
        }

      } else if (status >= 3 && status <= 6) {
        if (!$window.confirm('确定下载合同?合同查阅密码为您身份证号码后6位数字')) {
          return;
        }

        if (type !== 4 && type !== 2 && type !== 3 ) {
          OrderService.downloadContract.get({
            orderId: orderId,
            projectId: projectId
          }, function(response){
            if(response.ret !== -1){
              $scope.downloadPDF($scope.baseFileUrl() + response.data.contract.url);
            }
          });

          // $scope.downloadPDF('hongcai/api/v1/siteOrder/downloadContract?orderId=' + orderId + '&projectId=' + projectId);
        } else if (type === 4) {
          $scope.downloadPDF('hongcai/api/v1/siteCredit/downloadFundsContract?orderId=' + orderId);
        }  else if (type === 2 || type === 3) {
          OrderService.downloadAssignmentContract.get({
            orderId: orderId,
            projectId: projectId
          }, function(response){
            if(response.ret !== -1){
              $scope.downloadPDF($scope.baseFileUrl() + response.data.contract.url);
            }
          });
        }

      }

    };


    $scope.loadOrders = function(page){
      $scope.currentPage = page;
      var getOrderByUser = UserCenterService.getOrderByUser.get({
        page: page,
        pageSize: $scope.pageSize,
        type: $scope.type,
        dateInterval: $scope.dateInterval,
        status: $scope.status
      },
      function(response) {
        if (getOrderByUser.ret === 1) {
          $scope.orderList = getOrderByUser.data.orderList;
          $scope.count = getOrderByUser.data.count;
          $scope.type = getOrderByUser.data.type;
          $scope.dateInterval = getOrderByUser.data.dateInterval;
          $scope.status = getOrderByUser.data.status;
          $scope.notPayOrder = getOrderByUser.data.notPayOrder;
          $scope.productsMap = getOrderByUser.data.productsMap;
          $scope.orderStatistics = getOrderByUser.data.orderStatistics;
          $scope.orderStatus = getOrderByUser.data.orderStatus;
          $scope.data = [];
          $scope.numberOfPages = function() {
            return Math.ceil($scope.count / $scope.pageSize);
          };
          for (var i = 0; i < $scope.orderList.length; i++) {
            var item = $scope.orderList[i];
            item.url = item.type === 1 ? 'root.project-details({projectId: ' + item.projectId + '})' : 'root.activity-details({activityId: ' + item.projectId + ', type:' + item.type + '})';
            $scope.data.push(item);
            }

        } else {
          // toaster.pop('warning', response.msg);
        }
      });
    }

    $scope.loadOrders(1);



    /**
     * 继续支付订单
     */
    $scope.toPay = function(order) {

      var projectId = order.projectId;
      var orderId = order.id;
      var orderType = order.type;
      var orderAmount = order.orderAmount;
      var orderNumber = order.number;

      $scope.msg = '12';
      $scope.investAmount = orderAmount;
      $scope.page = 'investment';
      $alert({
        scope: $scope,
        template: 'views/modal/alertYEEPAY.html',
        show: true
      });

      window.open('/user-order-transfer/' + projectId + '/' + orderId + '/' + orderType + '?orderNumber=' + orderNumber);
    };

    /**
     * 取消订单
     */
    $scope.cancelOrder = function(number) {
      if ($window.confirm('确定取消订单?')) {
        /**
         * 确定要删除订单的弹窗。
         */
        UserCenterService.cancelOrder.get({
          number: number
        }, function(response) {
          if (response.ret === 1) {
            $state.reload();
          } else {
            toaster.pop('warning', '无法取消订单，请重试。');
          }
        });
      }
    };



    // Based on an implementation here: web.student.tuwien.ac.at/~e0427417/jsdownload.html
    $scope.downloadPDF = function(httpPath) {
      // Use an arraybuffer
      $http.get(httpPath, {
          responseType: 'arraybuffer'
        })
        .success(function(data, status, headers) {
          var blob;
          var octetStreamMime = 'application/pdf';
          var success = false;
          // Get the headers
          headers = headers();
          // Get the filename from the x-filename header or default to "download.bin"
          var filename = headers['x-filename'] || '宏财网借款协议.pdf';
          // Determine the content type from the header or default to "application/octet-stream"
          var contentType = headers['content-type'] || octetStreamMime;
          try {
            // Try using msSaveBlob if supported
            blob = new Blob([data], {
              type: contentType
            });
            if (navigator.msSaveBlob) {
              navigator.msSaveBlob(blob, filename);
            }
            else {
              // Try using other saveBlob implementations, if available
              var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
              if (saveBlob === undefined) {
                throw 'Not supported';
              }
              saveBlob(blob, filename);
            }
            success = true;
          } catch (ex) {
            // console.log("saveBlob method failed with the following exception:");
            // console.log(ex);
          }
          if (!success) {
            // Get the blob url creator
            var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
            if (urlCreator) {
              var link = document.createElement('a');
              if ('download' in link) {
                try {
                  // Prepare a blob URL
                  blob = new Blob([data], {
                    type: contentType
                  });
                  var url = urlCreator.createObjectURL(blob);
                  link.setAttribute('href', url);
                  // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                  link.setAttribute('download', filename);
                  // Simulate clicking the download link
                  var event = document.createEvent('MouseEvents');
                  event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                  link.dispatchEvent(event);
                  success = true;
                } catch (ex) {
                  // console.log("Download link method with simulated click failed with the following exception:");
                  // console.log(ex);
                }
              }
              if (!success) {
                try {
                  var openUrl;
                  // console.log("Trying download link method with window.location ...");
                  blob = new Blob([data], {
                    type: octetStreamMime
                  });
                  openUrl = urlCreator.createObjectURL(blob);
                  window.location = openUrl;
                  success = true;
                } catch (ex) {
                  // console.log("Download link method with window.location failed with the following exception:");
                  // console.log(ex);
                }
              }
            }
          }
          if (!success) {
            // console.log("No methods worked for saving the arraybuffer, using last resort window.open");
            var w = $window.open(httpPath, '_blank', '');
            w.location.href = httpPath;
          }
        })
        .error(function(data, status) {
          // console.log("Request failed with status: " + status);
          // Optionally write the error out to scope
          $scope.errorDetails = 'Request failed with status: ' + status;
        });
    };


    $scope.removeWarning = function() {
      angular.element('.notPayOrder').remove();
    };
  });
