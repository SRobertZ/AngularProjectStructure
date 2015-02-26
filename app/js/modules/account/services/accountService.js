/**
 * Created by rsabiryanov on 19.02.2015.
 */
/**
 * Логика по работе
 * @module account
 * @class account.accountService
 */
angular.module('account').factory('accountService', ['accountBackEnd', function (accountBackEnd) {
    var service = {};

    /**
     * Аутентификация пользователя
     *
     * @method login
     * @return {promise} Результат аунтефикации
     */
    service.login = function () {
        return accountBackEnd.login();
    };

    return service;
}]);
