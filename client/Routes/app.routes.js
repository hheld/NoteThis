/*global angular*/

(function () {
    'use strict';

    angular.module('noteThis')
        .config(routes);

    routes.$inject = ['$routeProvider'];

    function routes ($routeProvider) {
        $routeProvider
        .when('/newNote', {
            template: '<note-editor></note-editor>'
        })
        .when('/edit/:noteId', {
            template: '<note-editor note=ctrl.noteId></note-editor>',
            controllerAs: 'ctrl',
            controller: 'NoteEditRouteController',
            scope: { }
        });
    }
})();
