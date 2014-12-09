/* global angular, Markdown, console */

(function () {
    'use strict';

    angular
        .module('NoteEditor')
        .directive('noteEditor', noteEditor);

    function noteEditor() {
        var setup = {
            restrict: 'E',
            templateUrl: 'Editor/NoteEditor.html',
            link: link,
            controller: 'NoteEditorCtrl',
            controllerAs: 'ctrl',
            scope: {
                note: '='
            }
        };

        return setup;

        function link(scope, element, attr){
            Object.prototype.tooltip = function () {};
            var converter = Markdown.getSanitizingConverter(),
                editor = new Markdown.Editor(converter);

            editor.run();
        }
    }
})();
