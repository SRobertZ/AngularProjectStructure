/**
 * Created by rsabiryanov on 19.02.2015.
 */
/**
 * Работа с API
 * @module account
 * @class account.accountBackEnd
 */
(function (module) {
    module.factory('accountBackEnd', ['$q', function ($q) {
        var service = {};

        /**
         * Аутентификация пользователя
         *
         * @method login
         * @return {promise} Результат аунтефикации
         */
        service.login = function () {
            var defer = $q.defer();
            defer.resolve(true);
            return defer.promise;
        };
        return service;
    }]);
})(angular.module('app'));
