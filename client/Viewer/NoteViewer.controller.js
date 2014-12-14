/* global angular, console, confirm */

(function () {
    'use strict';

    angular
        .module('noteViewer')
        .controller('NoteViewerController', NoteViewerController);

    NoteViewerController.$inject = ['$scope', 'DataStorage', '$location', 'subscriptionService'];

    function NoteViewerController ($scope, DataStorage, $location, subscriptionService) {
        var vm = this;

        vm.deleteNote = deleteNote;
        vm.editNote = editNote;
        vm.toggleShown = toggleShown;

        // ####################################################################

        function deleteNote (noteId) {
            if (confirm('Are you sure you want to delete the note?')) {
                DataStorage
                .then(function (ds) {
                    ds.deleteNote(noteId)
                    .then(function () {
                        subscriptionService.noteListChanged();
                    });
                });
            }
        }

        function editNote (noteId) {
            $location.path('/edit/' + noteId);
        }

        function toggleShown (note) {
            note.isShown = !note.isShown;
        }
    }
})();
