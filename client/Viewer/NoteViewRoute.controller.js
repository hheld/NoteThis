/*global angular*/

(function () {
    'use strict';

    angular.module('noteThis')
        .controller('NoteViewRouteController', NoteViewRouteController);

    NoteViewRouteController.$inject = ['$routeParams', 'DataStorage', 'subscriptionService'];

    function NoteViewRouteController($routeParams, DataStorage, subscriptionService) {
        var vm = this;
        var noteId = $routeParams.noteId;
        vm.note = { isShown: true };

        DataStorage
        .then(function (ds) {
            ds.fetchNotePromise(noteId)
            .then(function (note) {
                vm.note.value = note;
                vm.note.key = note.id;

                subscriptionService.viewNote();
            });
        });
    }
})();
