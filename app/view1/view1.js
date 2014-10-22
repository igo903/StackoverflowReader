'use strict';

angular.module('myApp.view1', ['ngRoute', 'sfCore'])

 
.config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });

  
}])

.controller('View1Ctrl', ['$scope', 'sfService',function ($scope, sfService) {

     
    //sfService.getQuestions().then(function (result) {

    //    console.log(result);

    //});

    sfService.getQuestions().then(function (result) {

        $scope.questions = result.data;

        console.log(result.data);

    });




}]);