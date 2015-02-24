/**
 * Created by rsabiryanov on 19.02.2015.
 */
(function (module) {
    module.factory('accountBackEnd', ['$q', function ($q) {
        var service = {};

        service.login = function () {
            var defer = $q.defer();
            defer.resolve(true);
            return defer.promise;
        };
        return service;
    }]);
})(angular.module('app'));
