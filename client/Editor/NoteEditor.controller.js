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
        vm.save = save;
        vm.test = test;

        function save() {
            DataStorage.store({
                note: vm.note,
                date: new Date()
            });
        }

        function test() {
            DataStorage.fetchAllPromise()
            .then(function (allNotes) {
                console.log('Found ' + allNotes.length + ' notes:');
                allNotes.forEach(function (n) {
                    console.log(n.note);
                    console.log(n.date);
                });
            });
        }
    }
})();
