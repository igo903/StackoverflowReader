'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'sfCore',
  'ngSanitize'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/1' });
}])

.run(['sfService', function (sfService) {


    //sfService.getQuestions().then(function (data) {
    //    console.log(data);
    //});

   



}]);
