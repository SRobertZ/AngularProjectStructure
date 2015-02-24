/**
 * Created by rsabiryanov on 19.02.2015.
 */
(function (module) {
    module.factory('accountService', ['accountBackEnd', function (accountBackEnd) {
        var service = {};

        service.login = function () {
            return accountBackEnd.login();
        };
        return service;
    }]);
})(angular.module('app'));
