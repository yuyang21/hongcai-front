'use strict';
angular.module('hongcaiApp')
  .controller('QuestionnaireCtrl', function($scope, $state, $rootScope, $timeout, $alert, UserCenterService, $stateParams) {
  	$scope.showWarning = false;
  	$scope.busy = false;
  	$scope.questionAndAnswer = {};
  	$scope.tppe = '';
  	$scope.ability = '';

  	if(!$rootScope.isLogged){
			$state.go('root.login');
  	}

   	//风险测评问题详情  
   	$scope.getQuestionnaire = function(){
   		UserCenterService.getQuestionnaire.get({
   			userId: 0,
   			surveyType: 1
   		}, function(response){
   		  if(response && response.ret !== -1) {
   		  	$scope.questionnaires = response;
   		  }
   		})
   	};
    $scope.getQuestionnaire();

    //选择选项 
    $scope.select = function($event,question,answer) {
    	$scope.mask = true;
    	$scope.showWarning = false;
    	var el = (function(){
	      if ($event.target.nodeName === 'SPAN') {
	         return angular.element($event.target).parent(); // get li
	      } else {
	         return angular.element($event.target);          // is li
	      }
  	  })();
  	  $scope.questionAndAnswer[question] = answer;
  	  el.addClass('active').siblings('li').removeClass('active');
  	  $scope.submitQuestionnaire = function(){
  	  	if($scope.busy == true) {
  	  		return;
  	  	}
  	  	$scope.busy = true;
  	  	$scope.submit($scope.questionAndAnswer);
  	  }
    };
   //提交
    $scope.submit = function(questionAndAnswer) {
   		UserCenterService.questionnaire.post({
	   		userId: 0,
	   		surveyType: 1,
	   		answerJson: questionAndAnswer
	   	}, function(response){
	   	  if (response && response.ret !== -1) {
	   	  	$scope.questionnaires = response.questionnaires;
	   	  	$scope.getQuestionnaire();
	   	  	$alert({
	   	  	  scope: $scope,
	   	  	  template: 'views/modal/alert-results.html',
	   	  	  show: true
	   	  	});
					$scope.score = response.questionnaireRecords.score;
					$scope.riskInvestLimits = response.riskInvestLimits;
	   	  	$scope.type = response.riskInvestLimits.riskToleranceDesc;
	   	  	$timeout(function() {
	   	  		$scope.busy = false;
	   	  	}, 3000);
	   	  }
	   	  if(response.ret === -1 && response.msg) {
	   	  	$scope.warningMsg = response.msg;
	   	  	$scope.showWarning = true;
	   	  	$scope.busy = false;
	   	  	$timeout(function() {
	   	  		$scope.showWarning = false;
	   	  	}, 3000);
	   	  }
	   	})
	  };

		$scope.BackToPrePage = function() {
			if ($stateParams.number) {
				if ($stateParams.type) {
					$state.go('root.project-details', {number: $stateParams.number, type: $stateParams.type});
				} else {
					$state.go('root.assignments-detail', {number: $stateParams.number});
				}
			} else {
				$state.go('root.userCenter.security-settings');
			}
		}

  })