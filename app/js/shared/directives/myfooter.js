(function (module) {
    module.directive('myfooter', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/shared/directives/myfooter.html',
            scope:{},
            controller: ['$scope', function ($scope) {
                $scope.footerText = function () {
                    return 'Angular Project Structure';
                };
            }]
        }
    })
})(angular.module('shared'));
