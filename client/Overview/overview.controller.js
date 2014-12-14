/* global angular, console, confirm */

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
        vm.toggleShown = toggleShown;
        vm.filterTags = filterTags;

        // ####################################################################

        DataStorage.then(function (ds) {
            updateNoteList(ds);
        });

        function deleteNote (noteId) {
            if (confirm('Are you sure you want to delete the note?')) {
                DataStorage
                .then(function (ds) {
                    ds.deleteNote(noteId)
                    .then(function () {
                        updateNoteList(ds);
                    });
                });
            }
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

        function toggleShown (note) {
            note.isShown = !note.isShown;
        }

        function filterTags (element) {
            var passFilter = false;

            if (!vm.tagFilter) {
                passFilter = true;
            } else {
                var individualTags = vm.tagFilter.split(' ');

                individualTags.forEach(function (tag) {
                    if (element.value.tags.indexOf(tag) > -1) {
                        passFilter = true;
                    }
                });
            }

            return passFilter;
        }
    }
})();
