/* global angular, console */

(function () {
    'use strict';

    angular
        .module('noteEditor')
        .controller('NoteEditorController', NoteEditorController);

    NoteEditorController.$inject = ['DataStorage', '$scope'];

    function NoteEditorController (DataStorage, $scope) {
        var vm = this;

        vm.note = '';
        vm.title = '';
        vm.tags = '';
        vm.noteId = $scope.note;
        vm.existingNote = Boolean(vm.noteId);

        vm.save = save;
        vm.test = test;

        if(vm.existingNote) {
            DataStorage.then(function (ds) {
                ds.fetchNotePromise(vm.noteId)
                .then(function (note) {
                    vm.note = note.note;
                    vm.title = note.title;
                    vm.tags = note.tags;
                });
            });
        }

        // ####################################################################

        function save () {
            DataStorage.then(function (ds) {
                ds.store({
                    title: vm.title,
                    tags: vm.tags,
                    note: vm.note
                });
            });
        }

        function test () {
            DataStorage.fetchAllPromise()
            .then(function (allNotes) {
                console.log('Found ' + allNotes.length + ' notes:');
                allNotes.forEach(function (n) {
                    console.log(n.key);
                    console.log(n.value.note);
                    console.log(n.value.date);
                });
            });
        }
    }
})();
