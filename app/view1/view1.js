'use strict';

angular.module('myApp.view1', ['ngRoute', 'sfCore'])


.config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider) {

    $routeProvider.when('/:search?/:page', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });


}])

.controller('View1Ctrl', ['$scope', 'sfService', '$routeParams', '$rootScope', function ($scope, sfService, $routeParams, $rootScope) {

    $scope.questions = {};

    $scope.curPage = parseInt($routeParams.page, 10);
    $scope.searchParam = $routeParams.search;

    function getPages(link_count) {

        //http://www.ideawu.net/blog/archives/352.html 三行分页算法
        var start, end;
        start = Math.max(1, $routeParams.page - parseInt(link_count / 2));
        end = Math.min($scope.questions.total, start + link_count - 1);
        start = Math.max(1, end - link_count + 1);

        var result = [];

        for (var i = start; i <= end; i++) {
            result.push(i);
        }

        return result;
    }

    $scope.getPages = getPages;

    $scope.total = null;


    function getQuestions() {

        sfService.getQuestions($routeParams.search, $routeParams.page, 20, $rootScope.sort).then(function (result) {

            $scope.questions = result.data;

            $scope.total = result.data.total;

        });
    }

    $scope.$watch('sort', getQuestions);


}]);