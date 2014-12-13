/* global angular, console */

(function () {
    'use strict';

    angular
        .module('subscriptionService')
        .factory('subscriptionService', SubscriptionService);

    SubscriptionService.$inject = ['$rootScope'];

    function SubscriptionService ($rootScope) {
        var EDIT_MODE = "editMode";
        var GOTO_OVERVIEW = "goToOverview";

        return {
            editNote: editNote,
            onEditNote: onEditNote,
            goToOverview: goToOverview,
            onGoToOverview: onGoToOverview
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

        function goToOverview () {
            $rootScope.$broadcast(GOTO_OVERVIEW);
        }

        function onGoToOverview ($scope, handler) {
            $scope.$on(GOTO_OVERVIEW, function (event) {
                handler();
            });
        }
    }
})();
