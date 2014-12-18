/* global angular, console */

(function () {
    'use strict';

    angular
        .module('noteEditor')
        .controller('NoteEditorController', NoteEditorController);

    NoteEditorController.$inject = ['DataStorage', '$scope', '$location', 'subscriptionService', 'NoteLinks'];

    function NoteEditorController (DataStorage, $scope, $location, subscriptionService, NoteLinks) {
        var vm = this;

        vm.note = '';
        vm.title = $scope.note;
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
            vm.note = NoteLinks.noteLinksFixer(vm.note);

            DataStorage.then(function (ds) {
                var newNote = {
                    title: vm.title,
                    tags: vm.tags,
                    note: vm.note
                };

                ds.store(newNote).then(function () {
                    $location.path('/allNotes');
                    subscriptionService.goToOverview();
                });
            });
        }
    }
})();
