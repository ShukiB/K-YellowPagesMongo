var YellowPages = angular.module('YellowPages', ['ngRoute']);

YellowPages.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/views/search.html',
        controller: 'searchCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});