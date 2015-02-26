/**
 * Created by rsabiryanov on 26.02.2015.
 */
angular.module('account').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $stateProvider.state('access', {
        abstract: true,
        url: '/access',
        template: '<div ui-view></div>'
    }).state('access.signin', {
        url: '/signin',
        templateUrl: 'js/modules/account/controllers/signin/signIn.html',
        controller: 'SigninController'
    }).state('access.signup', {
        url: '/signup',
        templateUrl: 'js/modules/account/controllers/signup/signup.html',
        controller: 'SignupController'
    });
}]);
