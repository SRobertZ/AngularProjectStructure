/**
 * Created by rsabiryanov on 24.02.2015.
 */
(function (module) {
    module.controller('HelloController', ['$scope', function ($scope) {
        $scope.Text = "Hello, man!";
    }]);
})(angular.module('main'));
