/* global angular, console */

(function () {
    'use strict';

    angular
        .module('noteEditor')
        .factory('NoteLinks', NoteLinksFilter);

        // ####################################################################

    function NoteLinksFilter () {
        var service = {
            noteLinksFixer: noteLinksFixer
        };

        return service;

        function noteLinksFixer (noteText) {
            return noteText.replace(/\[\[(.*)\]\]/g, '[$1](/#/viewNote/$1)');
        }
    }
})();
