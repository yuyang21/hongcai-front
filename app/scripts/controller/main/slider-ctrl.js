'use strict';
angular.module('hongcaiApp')
  .controller('SliderCtrl', function($scope, $stateParams, $rootScope, $location, MainService) {
    $rootScope.selectPage = $location.path().split('/')[1];

    //http://www.hongcai.com/hongcai-trends?page=0&perPage=5
    $scope.defaultMedia = [/*{
      mimeType: 'image/png',
      src: 'images/banner-new/banner02.jpg',
      href: '/#!/activity/dual-eleven-activities',
      name: '双11活动 脱单party'
    },{
      mimeType: 'image/png',
      src: 'images/banner-new/banner12.jpg',
      href: '/#!/activity/novice-activity',
      name: '市场 新年新手活动'
    },{
      mimeType: 'image/png',
      src: 'images/banner-new/banner13.jpg',
      href: '/#!/activity/invite-activity',
      name: '市场 新年邀请活动'
    },*/{
      mimeType: 'image/png',
      src: 'images/banner-new/cgt-banner.jpg',
      href: '/#!/activate',
      name: '宣传存管通落地页'
    },{
      mimeType: 'image/png',
      src: 'images/banner-new/banner10.jpg',
      href: '/user-center/security-settings',
      name: '宣传自动投标'
    }/*,{
      mimeType: 'image/png',
      src: 'images/banner-new/banner09.jpg',
      href: '/#!/activity/invite-activity',
      name: '邀请好友投资送80元现金'
    },{
      mimeType: 'image/png',
      src: 'images/banner-new/banner07.jpg',
      href: '/#!/activity/novice-activity',
      name: '14%收益 新手专享'
    }/*,{
      mimeType: 'image/png',
      src: 'images/banner-new/banner08.jpg',
      href: '/#!/activity/send-coupon',
      name: '投资送加息券'
    },{
      mimeType: 'image/png',
      src: 'images/banner-new/banner11.jpg',
      href: $rootScope.isLogged ? '/#!/user-center/experience-money' : '/#!/register',
      name: '注册拿8888元'
    }*/,{
      mimeType: 'image/png',
      src: 'images/banner-new/banner01.png',
      name: '国有企业入驻宏财网'
    }, {
      mimeType: 'image/png',
      src: 'images/banner-new/banner05.png',
      href: 'http://www.hongcai.com/#!/us/hongcai-trends/491',
      name: '新三板金控第一股严选项目'
    }];

    MainService.homePageBanners.get({
      type: 1
    }, function(response) {
      if(response && response.ret !== -1){
        $scope.banners = response.data;
        if($scope.banners.length > 0){
          $scope.media = [];
          for(var i=0; i < $scope.banners.length; i++){
            var banner = {
              mimeType: 'image/png',
              src: $scope.banners[i].imageUrl,
              href: $scope.banners[i].linkUrl,
              name: $scope.banners[i].title
            }

            $scope.media.push(banner);
          }
        }else{
          $scope.media = $scope.defaultMedia;
        }
      }else {
        $scope.data = [];
        $scope.media = $scope.defaultMedia;
        toaster.pop('warning', '服务器正在努力的加载....请稍等。');
      }
    });
    

    $scope.del = function(i){
      if($rootScope.pay_company === 'yeepay'){
        $scope.media.splice(i,1);
      }
    }
    $scope.del(0);

    $scope.slickConfig = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 6000,
      onAfterChange: function(slick, index) {
        var slides = $('.slick-track').children().not('.slick-cloned');
        if (index >= slides.length) {
          return;
        }
      }
    };
    $scope.slickHandle = {};
  });
