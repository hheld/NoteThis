/* global angular, console */

(function () {
    'use strict';

    angular
        .module('NoteEditor')
        .controller('NoteEditorCtrl', NoteEditorCtrl);

    function NoteEditorCtrl() {
        var vm = this;

        vm.save = save;

        function save() {
            console.log('user wants to save note');
        }
    }
})();
