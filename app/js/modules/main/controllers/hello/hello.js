/**
 * Created by rsabiryanov on 24.02.2015.
 */
angular.module('main').controller('HelloController', ['$scope','notifyService', function ($scope,notifyService) {
    $scope.Text = "Hello, man!";
    $scope.showSuccess= function(){
        notifyService.success('Hello');
    }
}]);
