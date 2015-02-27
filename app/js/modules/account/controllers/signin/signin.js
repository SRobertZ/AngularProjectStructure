/**
 * Created by rsabiryanov on 19.02.2015.
 */
/**
 * Контроллер аутентификации
 * @module account
 * @class account.SigninController
 */
angular.module('account').controller('SigninController', ['$scope', 'accountService', '$state', function ($scope, accountService, $state) {
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

    $scope.login = function () {
        accountService.login().then(function () {
            $state.go('main.list');
        });
    };
}]);
