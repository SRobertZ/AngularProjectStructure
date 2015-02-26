/**
 * Created by rsabiryanov on 26.02.2015.
 */
angular.module('main').config(['$stateProvider', function ($stateProvider) {
    // For any unmatched url, redirect to /state1
    $stateProvider.state('main', {
        abstract: true,
        url: '/main',
        template: '<div ui-view></div>'
    }).state('main.list', {
        url: '/list',
        templateUrl: 'js/modules/main/controllers/hello/hello.html',
        controller: 'HelloController'
    });
}]);
