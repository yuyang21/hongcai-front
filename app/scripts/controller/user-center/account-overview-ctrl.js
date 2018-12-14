'use strict';
angular.module('hongcaiApp')
  .controller('AccountOverviewCtrl', function($scope, $state, $rootScope, $stateParams, ProjectService, UserCenterService, ProjectUtils, DateUtils) {
    var totalAssets = 0;
    var receivedProfit = 0;
    var balance = 0;
    var reward = 0;
    var currentDate = new Date().getTime()
    $rootScope.checkSession.promise.then(function(data) {
      data.registerTime = new Date(data.registerTime).setHours(0, 0, 0);
      var registerMonthStart = new Date(new Date(data.registerTime).getFullYear() + '/' + (new Date(data.registerTime).getMonth() + 1) + '/01 00:00:00').getTime() - 0.5;
      $scope.currentYearCopy = new Date().getFullYear();
      $scope.currentYear = new Date().getFullYear();//当前年份
      $scope.registerYear = new Date(data.registerTime).getFullYear() //首投年份
      $scope.registerDiff = DateUtils.intervalDays(currentDate, data.registerTime) //注册天数
      /**
       * 已收收益（累计）数据lables and data config， tab === 0
       */
      
      $scope.datasConfig = function(startTime, endTime) {
        $scope.yearlyData = [];
        $scope.labels = [];
        var datas = [];
        UserCenterService.getReceivedProfitGraphs.get({
          startTime: startTime,
          endTime: endTime
        }, function (response) {
          if (!response || response.ret === -1) {
            return
          }
          var monthProfit = response.data
          for(var i = 0; i <= monthProfit.length - 1; i++){
            var date1 = new Date(monthProfit[i].searchDate);
            if ($scope.registerDiff > 180) { //已收收益>180天横坐标按月，不到180天 横坐标按天
              $scope.labels.push(date1.getFullYear() + '-' + (date1.getMonth() + 1));
            } else {
              registerMonthStart = data.registerTime;
              $scope.labels.push(date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate());
            }
            // 单独处理注册月份之前的数据 置0
            if (monthProfit[i].searchDate < registerMonthStart) {
              monthProfit[i].profit = null;
            }
            datas.push(monthProfit[i].profit);
          }
          $scope.yearlyData.push(datas);
        })
      }

      /**
       * 每日收益数据 tab === 1 调用
       */
      $scope.dailyDatasCofig = function (startTime, endTime) {
        UserCenterService.getDayProfitGraphs.get({
          startTime: startTime,
          endTime: endTime
        }, function(response){
          var dayProfitGraphs = response.data;
          $scope.dailyDatas = [];
          $scope.dailyLabels = [];
          var dailyDatas = [];

          for(var i = 0; i <= dayProfitGraphs.length - 1; i++){
            var date = new Date(dayProfitGraphs[i].searchDate);
            $scope.dailyLabels.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
            dailyDatas.push(dayProfitGraphs[i].profit);
            if (dayProfitGraphs[i].searchDate < data.registerTime) {
              dailyDatas[i] = null;
            }
          }
          $scope.dailyData = [];
          $scope.dailyData.push(dailyDatas);
        });
      }

      /**
       *  日期切换
       */
      $scope.n = 0
      $scope.toggleDate = function (preOrNext, tab) {
        $scope.n = preOrNext === 2 ? 0 : $scope.n 
        // preOrNext = 0 上一桢，preOrNext = 1下一桢
        // 注册日和当前日期所在的那一帧不可以再点
        $scope.xFrame = Math.ceil($scope.registerDiff/12) - 1
        if (preOrNext === 0) {
          if ($scope.n >= $scope.xFrame || $scope.xFrame === -1) { //$scope.xFrame === -1 表示注册不到12天
            return;
          }
          $scope.n += 1;
        } else if (preOrNext === 1) {
          if ($scope.n === 0) {
            return;
          }
          $scope.n -= 1;
        }
        // 当前显示横坐标第1位
        var theNextDay = DateUtils.getBeforeDate(-1, currentDate) // 明天
        // var xFirst = $scope.n === $scope.xFrame ? data.registerTime : DateUtils.getBeforeDate(12 + 12*$scope.n, theNextDay)
        var xFirst = DateUtils.getBeforeDate(12 + 12*$scope.n, theNextDay)
        // 当前显示横坐标第12位
        var xLast = $scope.n === 0 ? theNextDay : DateUtils.getBeforeDate(-11, new Date(xFirst))
        // 注册日期所在帧不足12天，显示剩余的
        // xLast = $scope.n === $scope.xFrame ?  DateUtils.getBeforeDate(-$scope.registerDiff%12, new Date(xFirst)) : DateUtils.getBeforeDate(-11, new Date(xFirst))
        xLast = DateUtils.getBeforeDate(-11, new Date(xFirst))
        // 把第1位和第12位日期作为接口参数传入请求页面显示利息和日期
        if (tab === 0) {
          $scope.datasConfig(xFirst, xLast);
        } else {
          $scope.dailyDatasCofig(xFirst, xLast)
        }  
      } 
      /**
       *  年份切换
       */
      $scope.toggleYear = function(preOrNext) {
        if ($scope.registerDiff > 180) {
          //上一年
          if(preOrNext === 0){
            if ($scope.currentYear <= $scope.registerYear) {
              return
            }
            $scope.currentYear -= 1
          }
          //下一年
          if(preOrNext === 1){
            if ($scope.currentYear > new Date().getFullYear() - 1) {
              return
            }
            $scope.currentYear += 1
          }
          // 判断本帧开始月份是否是注册月份  
          // $scope.startTime = $scope.currentYear === $scope.registerYear ? new Date($scope.currentYear + '-' + (new Date(data.registerTime).getMonth() + 1) + '-01').getTime() : new Date($scope.currentYear + '-01-01').getTime()
          $scope.startTime = new Date($scope.currentYear + '-01-01').getTime()
          $scope.endTime = new Date($scope.currentYear + '-12-01').getTime()
          $scope.datasConfig($scope.startTime, $scope.endTime);  
        } else {
          $scope.toggleDate(preOrNext, 0)
        }
      }
      
      /*
      * 初始化已收收益数据
      **/
      $scope.toReceiveTab = function () {
        if($scope.registerDiff < 180) {
          $scope.toggleDate(2, 0)
        } else {
          $scope.toggleYear(2)
        }
      }
      $scope.toReceiveTab()
    })
    
    UserCenterService.getUserAccount.get(function(response) {
      if (response.ret === 1) {
        var account = response.data.account;
        totalAssets = response.data.totalAssets;
        receivedProfit = account.receivedProfit;
        balance = account.balance;
        reward = account.reward;

        $scope.reward = reward;
        $scope.account = response.data.account;
        $scope.account.totalAssets = totalAssets;
        if (totalAssets === 0 && receivedProfit === 0 && balance === 0) {
          totalAssets = 30;
          receivedProfit = 30;
          balance = 30;
        }
      }
    });

    UserCenterService.yestodayProfit.get(function(response) {
      if (response && response.ret !== -1) {
        $scope.yestodayProfit = response.profit;
      }
    })

    $scope.jigoubaoList = function() {
      ProjectService.getAccountOverviewProjects.get({
        categoryCode: "01"
      }, function(response) {
        if (response.ret === 1) {
          $scope.serverTime = response.data.serverTime;
          $scope.jigoubao = response.data.projectList;
          $scope.projectStatusMap = response.data.projectStatusMap;
          $scope.repaymentTypeMap = response.data.repaymentTypeMap;
          $scope.data = [];
          $scope.numberOfPages = function() {
            return Math.ceil($scope.data.length / $scope.pageSize);
          };
          for (var i = 0; i < $scope.jigoubao.length; i++) {
            $scope.jigoubao[i].showByStatus = $scope.jigoubao[i].status === 6 || $scope.jigoubao[i].status === 7 ? true : false;
            $scope.data.push($scope.jigoubao[i]);
            ProjectUtils.projectTimedown($scope.jigoubao[i], $scope.serverTime);
          }
        } else {
          $scope.data = [];
        }
      });
    };

    $scope.jigoubaoList();

    /**
     * 我的债权统计数据
     */

    UserCenterService.getCreditRightStatistics.get({}, function(response) {
      if (response.ret === 1) {
        $scope.creditRightStatis = response.data.creditRightStatis;
        $scope.showCreditRightStatistics = $scope.creditRightStatis.totalInvestCount;
      } else {
        $scope.showCreditRightStatistics = false;
      }
    });

    /**
     * 加息券统计信息
     */
    UserCenterService.getUserIncreaseRateCouponStatis.get({}, function(response) {
      if (response.ret === 1) {
        $scope.couponStatis = response.data.couponStatis;
      }
    });

    /**
     * 我的债权统计数据
     */
    $scope.getCreditRightStatistics = function() {
      UserCenterService.getCreditRightStatistics.get({}, function(response) {
        if (response.ret === 1) {
          $scope.statistics = response.data.creditRightStatis;
        }
      });
      
    };

    $scope.getCreditRightStatistics();

    /*
     * 现金券、加息券数量统计
     */
    $scope.getUserCoupons = function() {
      /**
       * 现金券统计
       */
      UserCenterService.cashCouponStatis.get(function(response) {
        if (!response || response.ret === -1) {
          return;
        }
        $scope.unUsedCashCoupon = response.unUsedCoupon;
      });
      /**
       * 加息券统计
       */
      UserCenterService.getUserIncreaseRateCouponStatis.get(function(response) {
        if (response.ret === 1) {
          $scope.unUsedRateCoupon = response.data.couponStatis.unUsedCoupon;
        }
      });
    }
    $scope.getUserCoupons();

    /**
     * 收益折线图配置
     */
    $scope.medals_colours = ['#f9721f','fdcfb3','rgba(0,0,0,0)'];
    $scope.onClick = function (points, evt) {
      //console.log(points, evt);
    };
    $scope.options = {
      bezierCurve: false,
      scaleShowVerticalLines: true, //竖线网格是否显示
      numberPrefix: "$",
      tooltipFontColor:'#fff', //tip字体颜色
      tooltipFillColor: '#f9721f',//tip背景颜色
    }

    
    //解决 部分浏览器 元素blur失效问题
    window.onclick = function (event) {
      var e = window.event || arguments[0];
      var _con1 = $('.select-payment');   // 设置目标区域
      var _con2 = $('.payment-box');   // 设置目标区域
      if(!_con1.is(e.target) && _con1.has(e.target).length === 0 && !_con2.is(e.target) && _con2.has(e.target).length === 0){ 
        $scope.showPaymentBox = false;
        $scope.$apply();
      }
    }

    /**
     * 待收回款日历
     */
    //页面加载初始化年月
    function FormatStr (df) { //统一日期月／日格式 保持两位
      df = df < 10 ? '0' + df : df;
      return df;
    }
    function concatStr (yy,mm,dd) {  //日期格式转为 'yyyy-mm-dd'
      return yy + '/' + mm + '/' + dd;
    }
    var mydate = new Date();
    var today = mydate.getDate();
    var todayTime = new Date(mydate.getFullYear()+'/'+(mydate.getMonth()+1 )+'/'+mydate.getDate()).getTime();
    var creditRightBillDateMap = {}
    var startDate = ' 00:00:00';
    var endtDate = ' 23:59:00';
    $scope.calendar_year = mydate.getFullYear()
    $scope.calendar_month = FormatStr(mydate.getMonth()+1);
    // 获取本月还款日期
    $scope.getRepaymentDates = function (startTime, endTime, yyyy, mm) {
      UserCenterService.repaymentDates.get({
        userId: 0,
        startTime: new Date(startTime + startDate).getTime(),
        endTime: new Date(endTime + endtDate).getTime()
      }, function(response){
        creditRightBillDateMap = response;
        $scope.showDate(yyyy, mm);
      })
      $scope.getCalendarData(startTime, endTime)
    }
    // 月度/当日数据统计
    $scope.getCalendarData = function (startTime, endTime) {
      UserCenterService.calendarData.get({
        userId: 0,
        startTime: new Date(startTime + startDate).getTime(),
        endTime: new Date(endTime + endtDate).getTime()
      }, function(response){
        if (response && response.ret !== -1) {
          $scope.month = {
            anticipateAmount: response.anticipateAmount,
            waitingAmount: response.waitingAmount
          }
        }
      })
    }
    // 预计/待收回款详情查询
    $scope.getRepaymentDetails = function (time,element) {
      UserCenterService.repaymentDetails.get({
        userId: 0,
        startTime: new Date(time + startDate).getTime(),
        endTime: new Date(time + endtDate).getTime(),
        type: 1
      }, function(response){
        if(response && response.ret !== -1) {
          var selectDateDate = response;
          element.parent().find(".totalAmount").html((selectDateDate.anticipateAmount).toFixed(2));
          element.parent().find(".principalAmount").html((selectDateDate.principalAmount).toFixed(2));
          element.parent().find(".interestAmount").html((selectDateDate.interestAmount).toFixed(2));
          element.parent().siblings().find(".f-table-msg").hide();
          element.parent().find(".f-table-msg").show();
        }
      })
    }

    //读取年月写入日历  重点算法!!!!!!!!!!!
    $scope.showDate = function (yyyy, mm) {
      var daysCount = new Date(parseInt(yyyy),parseInt(mm), 0).getDate(); //本月天数  
      var mystr ="";//写入代码
      var icon = "";//图标代码
      var week = new Date(parseInt(yyyy)+"/"+parseInt(mm)+"/"+1).getDay() == 0 ? 6 : new Date(parseInt(yyyy)+"/"+parseInt(mm)+"/"+1).getDay()-1;
      var lastMonth; //上一月天数
      parseInt(mm) ==1 ? lastMonth = new Date(parseInt(yyyy)-1,parseInt(12), 0).getDate() : lastMonth = new Date(parseInt(yyyy),parseInt(mm)-1, 0).getDate();

      for(var i=0;i<daysCount;i++){
        var setTime = new Date(yyyy+'/'+mm+'/'+(i+1)+startDate).getTime();  //对应日期数据毫秒值
 
        //计算上月空格数
        if( i%7 == 0){
          if(i<7){//只执行一次
            for(var j=0;j<week;j++){
              mystr += "<div class='f-td f-null' style='color:#fff;'>"+(lastMonth+j-week+1)+"</div>";
            }
          }
        }
        //这里为一个单元格，添加内容在此 
        if (creditRightBillDateMap && creditRightBillDateMap.indexOf(setTime) !== -1) {
          icon = (setTime >= todayTime) ? "<div class='f-yuan'>"+ FormatStr(i+1) +"</div>" : "<div class='f-yuan-grey'>"+ FormatStr(i+1) +"</div>";
          mystr += "<div class='f-td f-number'>"
                  + icon
                  +"<div class='f-table-msg'>当日回款总额：<span class='totalAmount'></span>元<br/>回款本金：<span class='principalAmount'></span>元<br/>回款利息：<span class='interestAmount'></span>元<p class='tip'>*详细回款信息可前往app查看</p></div>"//这里加判断
                  +"</div>"; 
        }else {
          mystr += "<div class='f-td f-number'><span class='f-day'>"+(i+1)+"</span>"+"</div>"; 
        }

      }
      //表格不等高，只补充末行不足单元格
      if(7-(daysCount+week)%7 <7){
        for(var k=0; k<7-(daysCount+week)%7;k++ ){ // week为今天周几 daysCount为本月天数  7-week为本行空格数 7-(daysCount+6-week)%7为最后一行有几个空格
          mystr += "<div class='f-td f-null' style='color:#fff;'>"+(k+1)+"</div>";
        }
      }

      //写入日历
      $(".f-rili-table .f-tbody").html(mystr);
      var tr = document.getElementsByClassName('f-td');
      for(var td=0;td<tr.length;td++){
        if((td>=0&&td<=6)||(td>=14&&td<=20)||(td>=28&&td<=34))  {
          $('.f-td').eq(td).addClass('bg-fa');
        }
      }
      //给今日加class
      if( mydate.getFullYear() == yyyy && (mydate.getMonth()+1 ) == mm){
        if (creditRightBillDateMap && creditRightBillDateMap.indexOf(new Date(yyyy+'/'+mm+'/'+today).getTime()) === -1) {
          $(".f-rili-table .f-number").eq(today-1).html('今日');
          $(".f-rili-table .f-number").eq(today-1).addClass("f-today");
        }
      }

      function addMouseFn (el) {
        el.mouseover(function() {
          $scope.getRepaymentDetails($scope.calendar_year+'/'+$scope.calendar_month+'/'+$(this).html(),$(this));
        }).mouseleave(function() {
          $(this).parent().find(".f-table-msg").hide();
        }).click(function() {
          // calculatTotalPay($(this).text());
        })
      }
      addMouseFn($(".f-yuan"));
      addMouseFn($(".f-yuan-grey"));
      $(".f-table-msg").mouseover(function() {
        $(this).hide().show();
      }).mouseleave(function() {
        $(this).hide();
      })

    }
    $rootScope.isLogged === true ? $scope.getRepaymentDates(mydate.getFullYear()+'/'+(mydate.getMonth()+1)+'/1', mydate.getFullYear()+'/'+(mydate.getMonth()+1)+'/31', mydate.getFullYear(), mydate.getMonth()+1) : null;
    //日历上一月
    $scope.lastMonth = function () {
      var mm = parseInt($scope.calendar_month);
      var yy = parseInt($scope.calendar_year);
      if( mm == 1){//返回12月
        $scope.calendar_year = yy-1;
        $scope.calendar_month = 12;
        $scope.getRepaymentDates((yy-1)+'/12/1', (yy-1)+'/12/'+new Date(parseInt(yy-1),parseInt(12), 0).getDate(), yy-1, 12);
      }else{//上一月
        $scope.calendar_month = FormatStr(mm-1);
        $scope.getRepaymentDates(yy+'/'+$scope.calendar_month+'/1', yy+'/'+$scope.calendar_month+'/'+new Date(parseInt(yy),parseInt($scope.calendar_month), 0).getDate(), yy, mm-1);
      }
    }
    $scope.nextMonth = function () {
      var mm = parseInt($scope.calendar_month);
      var yy = parseInt($scope.calendar_year);
      if( mm == 12){//返回12月
        $scope.calendar_year = yy+1;
        $scope.calendar_month = '01';
        $scope.getRepaymentDates($scope.calendar_year+'/1/1', $scope.calendar_year+'/1/'+new Date(parseInt(yy),parseInt(mm), 0).getDate(), yy+1, 1);
      }else{//上一月
        $scope.calendar_month = FormatStr(mm+1);
        $scope.getRepaymentDates(yy+'/'+$scope.calendar_month+'/1', yy+'/'+$scope.calendar_month+'/'+new Date(parseInt(yy),parseInt($scope.calendar_month), 0).getDate(), yy, mm+1);
      }
    }
    
  })
