/**
 * Created by rsabiryanov on 24.02.2015.
 */
angular.module('account').directive('copyright', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/modules/account/directives/copyright.html',
        scope: {},
        controller: ['$scope', function ($scope) {
            $scope.copyright = function () {
                return 'Page © - 2015';
            };
        }]
    }
});
