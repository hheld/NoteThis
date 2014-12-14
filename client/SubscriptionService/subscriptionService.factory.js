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
        var NOTE_LIST_CHANGED = "noteListChanged";
        var VIEW_MODE = "viewMode";

        return {
            editNote: editNote,
            onEditNote: onEditNote,
            goToOverview: goToOverview,
            onGoToOverview: onGoToOverview,
            noteListChanged: noteListChanged,
            onNoteListChanged: onNoteListChanged,
            viewNote: viewNote,
            onViewNote: onViewNote
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

        function noteListChanged () {
            $rootScope.$broadcast(NOTE_LIST_CHANGED);
        }

        function onNoteListChanged ($scope, handler) {
            $scope.$on(NOTE_LIST_CHANGED, function (event) {
                handler();
            });
        }

        function viewNote () {
            $rootScope.$broadcast(VIEW_MODE);
        }

        function onViewNote ($scope, handler) {
            $scope.$on(VIEW_MODE, function (event) {
                handler();
            });
        }
    }
})();
