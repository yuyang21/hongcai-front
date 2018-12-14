'use strict';
angular.module('hongcaiApp')
  .controller('NoviceGuideCtrl', ['$scope', '$state', '$rootScope', '$location', function($scope, $state, $rootScope, $location) {
    $rootScope.isNoviceGuide = true;
    // banner文字

    setTimeout(function(){
      $('.newbie-banner-header').animate({'opacity': 1},500,function(){
        $('.newbie-banner-header img').animate({'opacity': 1, 'width': '458px','margin-left':'143px'},1000);
      })
    }, 800);

    //宏财简介打字效果
    var txt = "宏财网（hongcai.com）2014年上线运营，2016年获得A轮融资，凭借广泛的金融资源、博士团队的专业能力和严谨的风控管理，为广大用户筛选优质项目。",
    	  count = 0,
        timerID;
    $(window).scroll(function(){
      if($(window).scrollTop() >= 100) {
        clearInterval(timerID);
        timerID = setInterval(function(){
          $("#intr-text").text(txt.substr(0,count++));
          if(count > txt.length) {
            clearInterval(timerID);
            return;
          }
        },40);
      }
    });
    
    //发展历程
    $('.development-course .part .time').on('mouseover', function(){  
        $(this).css('color','#ff6100');  
        $(this).parent().find('.contain').css('color','#ff6100');
    }).on('mouseleave', function(){  
        $(this).css('color','#666');  
        $(this).parent().find('.contain').css('color','#666');
    });
    var position1 = 0;
    var position2 = 100;
    var position3 = 200;
    function carousel(){
      $('.development-course .part2').show().animate({left: position2+'%'}, 800,function(){})
      $('.development-course .part1').show().animate({left: position1+'%'}, 800,function(){})
      $('.development-course .part3').show().animate({left: position3+'%'}, 800,function(){})
      if (position1 == 0) {
        $('.development-course .prev').hide();
      }else {
        $('.development-course .prev').show();
      }
      if (position3 == 0) {
        $('.development-course .next').hide();
      }else {
        $('.development-course .next').show();
      }
    } 
    $('.development-course .next').on('click', function(){
      position1-=100;
      position2-=100;
      position3-=100;
      carousel();
    });
    $('.development-course .prev').on('click', function(){
      position1+=100;
      position2+=100;
      position3+=100;
      carousel();
    });

    var p1 = 10;
    var p2 = 56;
    var p3 = 102;
    var v = 0;
    // 产品特点
    function product_course(){
      // if ((p1 ==102 && v >0) || (p1 ==102 && v <0)) {
      //   $('.product-features .jingxuan').css({display: 'none'})
      // } else {
        $('.product-features .jingxuan').show().animate({left: p1+'%'}, 800,function(){})
      // }
      // if ((p2 ==102 && v >0) || (p2 ==102 && v <0)) {
      //   $('.product-features .zungui').css({display: 'none'})
      // } else {
        $('.product-features .zungui').show().animate({left: p2+'%'}, 800,function(){})
      // }
      // if ((p3 ==102 && v >0) || (p3 ==102 && v <0)) {
      //   $('.product-features .assignment').css({display: 'none'})
      // } else {
        $('.product-features .assignment').show().animate({left: p3+'%'}, 800,function(){})
      // }
      
    }
    $('.product-features .next').on('click', function(){
      v = 1;
      p1+= p1<=10 ? 92 : -46;
      p2+= p2<=10 ? 92 : -46;
      p3+= p3<=10 ? 92 : -46;
      product_course();
    });
    $('.product-features .prev').on('click', function(){
      v = -1;
      p1+= p1>=102 ? -92 : 46;
      p2+= p2>=102 ? -92 : 46;
      p3+= p3>=102 ? -92 : 46;
      product_course();
    });  

    //高管团队悬浮效果
    $('.poster-item').hover(
      function(){
        if($(this).width() == 505){
          $(this).children('.hoverShow').stop().animate({backgroundColor: 'rgba(0,0,0,0.8)',top: 0},300);
          $(this).addClass('cursor-pointer');
        }
      },
      function() {
        if($(this).width() == 505){
          $(this).children('.hoverShow').stop().animate({backgroundColor: 'rgba(0,0,0,0.2)',top: '326px'},300);
        }
      }
    );
    $('.hoverShow').hover(
      function(){
        $(this).stop().animate({backgroundColor: 'rgba(0,0,0,0.8)',top: 0},300);
        $(this).addClass('cursor-pointer');
      }
    );



    //如何投资 圆圈背景变色
    $scope.processId = 1;
    $('#carousel-example-generic').on('slid.bs.carousel', function (ev) {
      var processId = ev.relatedTarget.id;
      $scope.processId = processId;
      $scope.$apply();

      if(processId== 1 || processId ==2 ){
        $('.process-circle').find('.li1').addClass('li_activ').siblings().removeClass('li_activ');
      }else if (processId >2 && processId < 6) {
        $('.process-circle').find('.li2').addClass('li_activ').siblings().removeClass('li_activ');
      }else if( processId > 5 && processId < 9) {
        $('.process-circle').find('.li3').addClass('li_activ').siblings().removeClass('li_activ');
      }else {
        $('.process-circle').find('.li4').addClass('li_activ').siblings().removeClass('li_activ');
      }
    });
  }]);
