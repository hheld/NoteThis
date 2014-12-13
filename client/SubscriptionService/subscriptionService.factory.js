/* global angular, console */

(function () {
    'use strict';

    angular
        .module('subscriptionService')
        .factory('subscriptionService', SubscriptionService);

    SubscriptionService.$inject = ['$rootScope'];

    function SubscriptionService ($rootScope) {
        var EDIT_MODE = "editMode";

        return {
            editNote: editNote,
            onEditNote: onEditNote
        };

        // ####################################################################

        function editNote () {
            $rootScope.$broadcast(EDIT_MODE);
        }

        function onEditNote ($scope, handler) {
            $scope.$on(EDIT_MODE, function (event) {
                handler();
            });
        }
    }
})();
