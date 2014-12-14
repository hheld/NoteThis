/* global angular, console, Markdown */

(function () {
    'use strict';

    angular
        .module('noteThis')
        .filter('markdown', markdownFilter);

        // ####################################################################

    function markdownFilter () {
        var converter = new Markdown.getSanitizingConverter();

        return makeHtml;

        function makeHtml (input) {
            if(input) {
                return converter.makeHtml(input);
            }
        }
    }
})();
