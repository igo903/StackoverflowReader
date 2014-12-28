'use strict';

angular.module('myApp.view1', ['ngRoute', 'sfCore'])

 
.config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider) {

  $routeProvider.when('/:search?/:page', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });

  
}])

.controller('View1Ctrl', ['$scope', 'sfService', '$routeParams', function ($scope, sfService, $routeParams) {

    $scope.questions = null;
    $scope.pages = [];

    $scope.curPage = parseInt($routeParams.page, 10);
    $scope.searchParam = $routeParams.search;


    var link_count = 20;

    sfService.getQuestions($routeParams.search, $routeParams.page, 20).then(function (result) {

        $scope.questions = result.data;

        //http://www.ideawu.net/blog/archives/352.html 三行分页算法
        var start, end;
        start = Math.max(1, $routeParams.page - parseInt(link_count / 2));
        end = Math.min(result.data.total, start + link_count - 1);
        start = Math.max(1, end - link_count + 1);

        var result = [];

        for (var i = start; i <= end; i++) {
            result.push(i);
        }
         
        $scope.pages = result;

     });




}]);