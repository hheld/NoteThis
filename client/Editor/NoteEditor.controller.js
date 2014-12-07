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

        function save() {
            DataStorage.store({
                note: vm.note,
                date: Date()
            });
        }
    }
})();
