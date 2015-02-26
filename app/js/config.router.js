/**
 * Created by rsabiryanov on 19.02.2015.
 */
angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('access/signin');
}]);