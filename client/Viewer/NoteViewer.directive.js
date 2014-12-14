/* global angular, console */

(function () {
    'use strict';

    angular
        .module('noteViewer')
        .directive('noteViewer', noteViewer);

    function noteViewer() {
        var setup = {
            restrict: 'E',
            templateUrl: 'Viewer/NoteViewer.html',
            controller: 'NoteViewerController',
            controllerAs: 'ctrl',
            scope: {
                note: '='
            }
        };

        return setup;
    }
})();
