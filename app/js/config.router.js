/**
 * Created by rsabiryanov on 19.02.2015.
 */
angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('access/signin');
    $stateProvider.state('access', {
        abstract: true,
        url: '/access',
        template: '<div ui-view></div>'
    }).state('access.signin', {
        url: '/signin',
        templateUrl: 'js/modules/account/views/signIn.html',
        controller: 'SigninController'
    });
}]);