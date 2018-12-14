'use strict';
angular.module('hongcaiApp')
  .factory('ShareUtils', function($resource, DEFAULT_DOMAIN) {
    return {

		toWeibo: function(title, url, picurl){
			var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title;  
			if(url){
				sharesinastring += '&url='+url+'&content=utf-8&sourceUrl='+url;
			}
			if(picurl){
				sharesinastring += '&pic='+picurl;
			}
 			window.open(sharesinastring,'newwindow','height=500,width=600,top=300,left=300'); 
    	},

		toQQzone: function(title, url, desc){
			var shareqqzonestring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+ encodeURIComponent(title);  

			if(url){
				shareqqzonestring += '&url='+encodeURIComponent(url);
			}

			if(desc){
				shareqqzonestring += '&desc='+encodeURIComponent(desc);
			}

 			window.open(shareqqzonestring,'newwindow','height=500,width=600,top=200,left=300'); 
    	}



    };
  });
