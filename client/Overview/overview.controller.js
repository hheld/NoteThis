/* global angular, console */

(function () {
    'use strict';

    angular
        .module('noteThis')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['DataStorage', '$location'];

    function OverviewController (DataStorage, $location) {
        var vm = this;

        vm.notes = [];
        vm.deleteNote = deleteNote;
        vm.editNote = editNote;

        // ####################################################################

        DataStorage.then(function (ds) {
            updateNoteList(ds);
        });

        function deleteNote (noteId) {
            DataStorage
            .then(function (ds) {
                ds.deleteNote(noteId)
                .then(function () {
                    updateNoteList(ds);
                });
            });
        }

        function updateNoteList (ds) {
            ds.fetchAllPromise()
            .then(function (notes) {
                vm.notes = notes;
            });
        }

        function editNote (noteId) {
            $location.path('/edit/' + noteId);
        }
    }
})();
