/* global angular, Markdown */

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
            replace: true,
            controller: 'NoteEditorCtrl',
            controllerAs: 'ctrl',
            scope: {}
        };

        return setup;

        function link() {
            Object.prototype.tooltip = function () {};
            var converter = Markdown.getSanitizingConverter(),
                editor = new Markdown.Editor(converter);
            editor.run();
        }
    }
})();
