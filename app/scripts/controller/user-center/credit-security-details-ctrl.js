'use strict';
angular.module('hongcaiApp')
  .controller('CreditSecurityCtrl', ['$location', '$scope', '$http', '$window', '$rootScope', '$state', '$stateParams', 'UserCenterService', 'ProjectService', 'OrderService', 'toaster', 'config', function($location, $scope, $http, $window, $rootScope, $state, $stateParams, UserCenterService, ProjectService, OrderService, toaster, config) {
    $rootScope.selectPage_two = $location.path().split('/')[2].split('-')[0];
    $scope.number = $stateParams.number;
    $scope.detailStatus = 1;

    //债权项目信息
    UserCenterService.assignmentCreditDetail.get({
      number: $scope.number 
    }, function(response){
      if (response && response.ret !== -1) {
        $scope.project = response.project;
        $scope.creditRight = response.creditRight;
        $scope.orderNum = response.creditRight.orderNum;
        $scope.increaseRateCoupon = response.increaseRateCoupon;
        $scope.oriRate = $scope.creditRight.baseRate + $scope.creditRight.riseRate;
        $scope.waitProfit = $scope.creditRight.profit - $scope.creditRight.returnProfit;

        //订单详情 
        UserCenterService.orderDetail.get({
          orderNumber: $scope.orderNum
        }, function(response){
          if (response && response.ret !== -1) {
            $scope.orderDetail = response;
          }
        });
    
      }
    });
    
    //还款计划 
    UserCenterService.getCreditRightBills.get({
      number: $scope.number
    }, function(response){
      if (response && response.ret !== -1) {
        $scope.creditRightBill = response.data;
      }
    });

    //下载合同
    $scope.generateContractPDF = function(projectId, orderId, status, type, projectNumber, orderNumber) {
      if (type === 2 || type === 3) {
        OrderService.downloadAssignmentContract.get({
          orderNumber: orderNumber
        }, function(response){
          if(response.ret !== -1){
            window.open(response.downUrl, "_self");
          }else {
            toaster.pop('warning', response.msg);
          }
        })
      }
      ProjectService.contractTemplate.get({
        number: projectNumber
      }, function(response){
        if (response.ret !== -1) {
          if (status === 2 && type !== 2 && type !== 3) {//未放款下载模板
            toaster.pop('warning', '项目还未放款，请稍候尝试');
            // ProjectService.contractTemplateFile.get({
            //   templateId: response.id
            // }, function(response){
            //   $scope.downloadPDF($scope.baseFileUrl() + response.url);
            // });
          }
          if (status >= 3 && status <= 6 && type !== 2 && type !== 3) {//放款下载合同
            if (response.type === 1 || response.type === 2 || response.type === 5 || response.type === 6 || response.type === 7 || response.type === 8 || response.type === 9 || response.type === 10 || response.type === 12 || response.type === 17) {//法大大直投和债转项目合同下载
              OrderService.downloadContractFdd.get({
                orderNumber: orderNumber,
              }, function(response){
                if(response.ret !== -1){
                  window.open(response.downUrl, "_self");
                  if (response.cutInerestDownUrl != null) {
                    window.open(response.cutInerestDownUrl, "_self");
                  }
                }else {
                  toaster.pop('warning', response.msg);
                }
              });
            }
            if (response.type === 4) {//多方协议合同下载
              if (!$window.confirm('确定下载合同?合同查阅密码为您身份证号码后6位数字')) {
                return;
              }
              OrderService.downloadContract.get({
                orderId: orderId,
                projectId: projectId
              }, function(response){
                if(response.ret !== -1){
                  $scope.downloadPDF($scope.baseFileUrl() + response.data.contract.url);
                }else {
                  toaster.pop('warning', response.msg);
                }
              });
            }
          }
        }else {
          toaster.pop('warning', response.msg);
        }
      });
    };
    
    $scope.baseFileUrl = function(){
      if($location.protocol() === 'http'){
        return 'http' + config.baseFileUrl.substr(config.baseFileUrl.indexOf("//") - 1);
      } else {
        return 'https' + config.baseFileUrl.substr(config.baseFileUrl.indexOf("//") - 1);
      }
    }

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
    

  }]);
