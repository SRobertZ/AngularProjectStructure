/**
 * Created by rsabiryanov on 26.02.2015.
 */
/**
 * Сервис по отображению нотификаций
 * https://github.com/jacqueslareau/angular-pnotify
 * @module shared
 * @class account.notifyService
 */
angular.module('shared').factory('notifyService', ['notificationService', function (notificationService) {
    var service = {};

    var options = {
        stackName: 'bottom_right'
    };
    service.info = function (text) {
        notificationService.info(text, options.stackName);
    };
    service.notice = function (text) {
        notificationService.notice(text, options.stackName);
    };
    service.error = function (text) {
        notificationService.error(text, options.stackName);
    };
    service.success = function (text) {
        notificationService.success(text, options.stackName);
    };

    return service;
}]);

