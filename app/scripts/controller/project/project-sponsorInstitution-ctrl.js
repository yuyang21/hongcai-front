'use strict';
angular.module('hongcaiApp')
  .controller('ProjectSponsorInstitutionCtrl', ['$scope', '$stateParams', '$location', '$timeout', 'ProjectService', function($scope, $stateParams, $location, $timeout, ProjectService) {
    $scope.sortType = $stateParams.sortType || false;

    var sponsorInstitution = ProjectService.sponsorInstitution.get({
      guaranteeId: $stateParams.guaranteeId
    }, function() {
      $scope.projectList = sponsorInstitution.data.projectList;
      $scope.guarantee = sponsorInstitution.data.guarantee;
      $scope.guaranteeProjectStat = sponsorInstitution.data.guaranteeProjectStat;
      $scope.originalFile = sponsorInstitution.data.originalFile;
      $scope.thumbnailFile = sponsorInstitution.data.thumbnailFile;
      $scope.baseFileUrl = sponsorInstitution.data.baseFileUrl;

      /**
       * 控制展开按钮展示
       */
      var arr = $scope.guarantee.description.split('');
      if (arr.length <= 709) {
        $('.fa').hide();
      } else {
        $('.fa').show();
      }

      $scope.currentPage = 0;
      $scope.pageSize = 6;
      $scope.data = [];

      $scope.numberOfPages = function() {
        return Math.ceil($scope.data.length / $scope.pageSize);
      };
      for (var i = 0; i < $scope.projectList.length; i++) {
        $scope.data.push($scope.projectList[i]);
      }

      //console.log(sponsorInstitution.data)

      $scope.files = [];
      for (var x = 0; x < $scope.originalFile.length; x++) {
        var item = {};
        item.title = $scope.originalFile[x].uploadFile.originalName;
        item.src = $scope.thumbnailFile[x].uploadFile.url;
        item.href = $scope.originalFile[x].uploadFile.url;
        $scope.files.push(item);
      }

      var promise = $timeout(function() {
        if ($('.slideshow').find('.slick-item').length === $scope.originalFile.length) {
          $('.slideshow').slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 1500,
            slidesToShow: 4,
            slidesToScroll: 4
          });
          $timeout.cancel(promise);
        }

      }, 10);



    });

    $scope.changeScale = function() {
      if ($('.sponsor-description .fa').hasClass('fa-arrow-down')) {
        $('.sponsor-description').css({
          'height': 'auto'
        });
        $('.sponsor-description .fa').removeClass('fa-arrow-down');
        $('.sponsor-description .fa').addClass('fa-arrow-up');
        $('.sponsor-description .fa').css({
          'right': '20px'
        });
        $('.sponsor-description .fa').text('收起');
      } else {
        $('.sponsor-description').css({
          'height': '363px'
        });
        $('.sponsor-description .fa').removeClass('fa-arrow-up');
        $('.sponsor-description .fa').addClass('fa-arrow-down');
        $('.sponsor-description .fa').css({
          'right': '33.4%'
        });
        $('.sponsor-description .fa').text('展开');
      }

    };

  }]);
