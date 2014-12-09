/* global angular, console */

(function () {
    'use strict';

    angular
        .module('NoteEditor')
        .controller('NoteEditorCtrl', NoteEditorCtrl);

    NoteEditorCtrl.$inject = ['DataStorage', '$scope'];

    function NoteEditorCtrl (DataStorage, $scope) {
        var vm = this;

        vm.note = '';
        vm.title = '';
        vm.tags = '';
        vm.noteId = $scope.note;

        vm.save = save;
        vm.test = test;

        function save() {
            DataStorage.store({
                title: vm.title,
                tags: vm.tags,
                note: vm.note
            });
        }

        function test() {
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
