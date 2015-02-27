/**
 * Created by rsabiryanov on 26.02.2015.
 */
angular.module('shared').config(['notificationServiceProvider', function(notificationServiceProvider) {
    notificationServiceProvider
        .setDefaults({
            history: false,
            delay: 4000,
            closer: false,
            closer_hover: false
        })
        // Configure a stack named 'bottom_right' that append a call 'stack-bottomright'
        .setStack('bottom_right', 'stack-bottomright', {
            dir1: 'up',
            dir2: 'left',
            firstpos1: 25,
            firstpos2: 25
        });
    ;

}]);