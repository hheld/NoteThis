/*global angular, alert*/

(function () {
    'use strict';

    angular.module('noteThis')
        .controller('NoteViewRouteController', NoteViewRouteController);

    NoteViewRouteController.$inject = ['$routeParams', 'DataStorage', 'subscriptionService', '$location'];

    function NoteViewRouteController($routeParams, DataStorage, subscriptionService, $location) {
        var vm = this;
        var noteId = $routeParams.noteId;
        vm.note = { isShown: true };

        DataStorage
        .then(function (ds) {
            ds.fetchNotePromise(noteId)
            .then(function (note) {
                vm.note.value = note;
                vm.note.key = noteId;

                subscriptionService.viewNote();
            }, function (err) {
                $location.path('/edit/' + noteId);
            });
        });
    }
})();
