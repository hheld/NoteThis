/*global angular, Markdown*/

(function () {
    'use strict';

    var app = angular.module('NoteEditor', [])
        .directive('noteEditor', function () {
            return {
                restrict: 'E',
                templateUrl: 'Editor/NoteEditor.html',
                link: function () {
                    Object.prototype.tooltip = function () { };
                    var converter = Markdown.getSanitizingConverter(),
                        editor = new Markdown.Editor(converter);
                    editor.run();
                }
            };
        });
}());
