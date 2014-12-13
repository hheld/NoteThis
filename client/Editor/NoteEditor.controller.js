/* global angular, console */

(function () {
    'use strict';

    angular
        .module('noteEditor')
        .controller('NoteEditorController', NoteEditorController);

    NoteEditorController.$inject = ['DataStorage', '$scope', '$location', 'subscriptionService'];

    function NoteEditorController (DataStorage, $scope, $location, subscriptionService) {
        var vm = this;

        vm.note = '';
        vm.title = '';
        vm.tags = '';
        vm.noteId = $scope.note;
        vm.existingNote = Boolean(vm.noteId);

        vm.save = save;

        if(vm.existingNote) {
            DataStorage.then(function (ds) {
                ds.fetchNotePromise(vm.noteId)
                .then(function (note) {
                    vm.note = note.note;
                    vm.title = note.title;
                    vm.tags = note.tags;
                    vm.date = note.date;
                });
            });
        }

        // ####################################################################

        function save () {
            DataStorage.then(function (ds) {
                var newNote = {
                    title: vm.title,
                    tags: vm.tags,
                    note: vm.note
                };

                if (vm.existingNote) {
                    newNote.id = parseInt(vm.noteId);
                }

                ds.store(newNote).then(function () {
                    $location.path('/allNotes');
                    subscriptionService.goToOverview();
                });
            });
        }
    }
})();
