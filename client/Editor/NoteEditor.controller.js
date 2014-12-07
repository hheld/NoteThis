/* global angular, console */

(function () {
    'use strict';

    angular
        .module('NoteEditor')
        .controller('NoteEditorCtrl', NoteEditorCtrl);

    NoteEditorCtrl.$inject = ['DataStorage'];

    function NoteEditorCtrl (DataStorage) {
        var vm = this;

        vm.note = '';
        vm.title = '';
        vm.tags = '';

        vm.save = save;

        function save() {
            DataStorage.store({
                title: vm.title,
                tags: vm.tags,
                note: vm.note
            });
        }

/*        function test() {
            DataStorage.fetchAllPromise()
            .then(function (allNotes) {
                console.log('Found ' + allNotes.length + ' notes:');
                allNotes.forEach(function (n) {
                    console.log(n.note);
                    console.log(n.date);
                });
            });
        }*/
    }
})();
