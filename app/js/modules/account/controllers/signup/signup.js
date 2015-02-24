/**
 * Created by rsabiryanov on 24.02.2015.
 */
/**
 * Created by rsabiryanov on 19.02.2015.
 */
(function (module, $) {
    module.controller('SignupController', ['$scope', function ($scope) {
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
        $scope.signup= function(){

        };
    }]);
})(angular.module('app'), $);
