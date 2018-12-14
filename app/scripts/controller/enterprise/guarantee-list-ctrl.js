'use strict';
angular.module('hongcaiApp')
  .controller('GuaranteeListCtrl', function($scope, $stateParams, $location, $rootScope, GuaranteeService, projectStatusMap) {
    $scope.projectStatusMap = projectStatusMap;

    $scope.sortType = $stateParams.sortType || false;
    $rootScope.pageTitle = '宏金宝 - 宏财网';

    var sponsor = GuaranteeService.guaranteeList.get(function() {
      $scope.guaranteeList = sponsor.data.guaranteeList;
      $scope.baseFileUrl = sponsor.data.baseFileUrl;

      $scope.media = [];
      var card = {};
      var m = Math.floor($scope.guaranteeList.length / 9);
      var n = $scope.guaranteeList.length % 9;
      var s;
      if (m === 0 && n !== 0) {
        s = $scope.guaranteeList.slice(0, n);
        card.items = s;
        card.baseFileUrl = $scope.baseFileUrl;
        $scope.media.push(card);
      } else if (m !== 0 && n === 0) {
        for (var i = 1; i <= m; i++) {
          s = $scope.guaranteeList.slice((i - 1) * 9, i * 9 - 1);
          card.items = s;
          card.baseFileUrl = $scope.baseFileUrl;
          $scope.media.push(card);
        }
      } else if (m !== 0 && n !== 0) {
        for (var x = 1; x <= m; x++) {
          s = $scope.guaranteeList.slice((x - 1) * 9, x * 9);
          card.items = s;
          card.baseFileUrl = $scope.baseFileUrl;
          $scope.media.push(card);
        }

        var t = $scope.guaranteeList.slice(m * 9);
        card.items = t;
        card.baseFileUrl = $scope.baseFileUrl;
        $scope.media.push(card);

      }

      $scope.slickConfig = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        onAfterChange: function(slick, index) {
          var slides = $('.slick-track').children().not('.slick-cloned');
          if (index >= slides.length) {
            return;
          }
          // $(slides[index]).find('video').each(playVideo);
        }
      };

      $scope.slickHandle = {};

    });

  });
