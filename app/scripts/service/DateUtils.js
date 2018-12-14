'use strict';
angular.module('hongcaiApp')
  .factory('DateUtils', function ($resource, DEFAULT_DOMAIN) {
    return {

		toHourMinSeconds: function (intervalTimeInMills) {
			var date = new Date(intervalTimeInMills - 8 * 60 * 60 * 1000);
			var dateStr = date.toTimeString().substring(0, 8);

			var time = {};
			time.hour = dateStr.substring(0,2);
			time.min = dateStr.substring(3,5);
			time.seconds = dateStr.substring(6,8);

			var hours = Math.floor(intervalTimeInMills/(60 * 60 * 1000));
			if (hours >= 24){
			time.hour = hours;
			}

			return time;
    	},

		toDayHourMinSeconds: function (intervalTimeInMills) {
			var date = new Date(intervalTimeInMills - 8 * 60 * 60 * 1000);
			var dateStr = date.toTimeString().substring(0, 8);

			var time = {};
			time.day = Math.floor(intervalTimeInMills/(24 * 60 * 60 * 1000));
			time.hour = dateStr.substring(0,2);
			time.min = dateStr.substring(3,5);
			time.seconds = dateStr.substring(6,8);

			return time;
    	},

    	/**
    	 * 两个long型时间的时间间隔
    	 */
    	intervalDays: function (timeInMills1, timeInMills2){
    		var DAY_TIME_IN_MILLS = 24 * 60 * 60 * 1000;

    		var time1 = Math.floor(timeInMills1/DAY_TIME_IN_MILLS) * DAY_TIME_IN_MILLS;
    		var time2 = Math.floor(timeInMills2/DAY_TIME_IN_MILLS) * DAY_TIME_IN_MILLS;

    		return Math.abs((time2 - time1)/DAY_TIME_IN_MILLS);
    	},
    	/**
    	 * long型时间转为yyyy-MM-dd
    	 */
    	longTimeToDate: function (longTime) {
    	  var date = new Date(longTime);
    	  var month = date.getMonth() < 9 ? '0'+ (date.getMonth()+1) : date.getMonth() + 1;
    	  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    	  return date.getFullYear() + '-' + month + '-' + day;
    	},
    	/**
    	 * 2017 提现预计到账时间 currentDate: 当前时间 Holiday：本年度法定假日除调休日 WeekendsOff：法定假日中调休
    	 */
    	withdrawArriveDate: function(currentDate, Holiday, WeekendsOff) {
    		//理论上到账日期
    		var nextDay = this.longTimeToDate(currentDate.getTime() + 24 * 3600 * 1000);
    		var currentDay = this.longTimeToDate(currentDate.getTime());
			//预计到账是法定节假日
			if( Holiday.indexOf(nextDay) !== -1) {
                //2月节假日提现
                if(currentDate.getMonth() === 1 ) {
                    nextDay = new Date('2018-02-22').getTime();
                } else if(currentDate.getMonth() === 3) {
                    //4月节假日提现
                    nextDay = currentDate.getDate() < 8 ? new Date('2018-04-08').getTime() : new Date('2018-05-02').getTime();
                } else if(currentDate.getMonth() === 4 ) {
                    //5月节假日提现
				  	nextDay = new Date('2018-05-02').getTime();
				} else if(currentDate.getMonth() === 5){
                    //6月节假日提现
                    nextDay = new Date('2018-06-19').getTime();
                } else if(currentDate.getMonth() === 8){
					//9月节假日提现
				  	nextDay = new Date('2018-09-25').getTime();
				} else {
					//10月节假日提现
					nextDay = new Date('2018-10-08').getTime();
				}
			}else{
				//预计到账不是法定节假日
    		  	//提现当天是周五
    		    if(currentDate.getDay() === 5 || currentDate.getDay() === 6) {
    		  	  //默认下周一到账
    		  	    nextDay = currentDate.getDay() === 5 ? currentDate.getTime() + 24 * 3 * 3600 * 1000 : currentDate.getTime() + 24 * 2 * 3600 * 1000;;
    		  	  //周六调休特殊考虑 周五提现周六到账
    		  	    for( var i = 0; i < WeekendsOff.length; i ++) {
    		  	        if(Math.abs(new Date(WeekendsOff[i]).getTime() - currentDate.getTime() ) < 24 * 2 *3600*1000) {
    		  	  			nextDay = currentDate.getTime() + 24 * 3600 * 1000;
    		  	   		}
    		  	 	}
    		  	}
    		}
    		return nextDay;
    	},
        getBeforeDate: function (n, date) {
            // 获取某日 n 天前的日期, n < 0表示该日期 n 天后的日期
            var n = n;
            var d = new Date(date);
            var year = d.getFullYear();
            var mon = d.getMonth() + 1;
            var day = d.getDate();  
            if (day <= n) {
                if (mon > 1) {
                    mon = mon - 1;  
                } else {
                    year = year - 1;  
                    mon = 12;
                }
            }
            d.setDate(d.getDate() - n);
            year = d.getFullYear();
            mon = d.getMonth() + 1;
            day = d.getDate();
            var s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
            return new Date(s).getTime();
            // return s;
        }
        // getYear

    };
  });
