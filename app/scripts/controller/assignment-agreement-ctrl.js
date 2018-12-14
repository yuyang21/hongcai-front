'use strict';
angular.module('hongcaiApp')
  .controller('AssignmentAgreementCtrl', function ($stateParams, $scope) {
    $scope.assignmentType = $stateParams.assignmentType;
  })