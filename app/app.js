'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'sfCore',
  'ngSanitize',
  'ngAnimate'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/1' });
}])


.controller('mainCtrl', ['$scope', '$rootScope', '$routeParams', 'sfService', '$location', function ($scope, $rootScope, $routeParams, sfService, $location) {

    $rootScope.sort = 'activity';

    $scope.setSort = function (sort, sortBy) {
        $rootScope.sort = sort;

        $scope.sortBy = sortBy;
    };
 
    $scope.sortBy = '默认排序';


    $scope.searchInputs = null;

    $scope.$routeParams = $routeParams;


    $scope.searchKeyWords = function (search) {

        $location.path('/' + $scope.searchInputs + '/1');

    };


    //bad practice 
    //应该用directive
    $scope.$on('$routeChangeSuccess', function () {
        $('#top-navbar').collapse('hide');
    });

    
    $('#top-navbar').collapse({
        toggle: false
    });


    $scope.collapse = function () {
        $('#top-navbar').collapse('toggle');
    }


}]);