/**
 * Created by rsabiryanov on 19.02.2015.
 */
(function (module, $) {
    module.controller('SigninController', ['$scope', function ($scope) {
        $scope.showPassword = function () {
            var key_attr = $('#key').attr('type');
            if (key_attr != 'text') {
                $('.checkbox').addClass('show');
                $('#key').attr('type', 'text');
            } else {
                $('.checkbox').removeClass('show');
                $('#key').attr('type', 'password');
            }
        };
        $scope.login= function(){

        };
    }]);
})(angular.module('app'), $);