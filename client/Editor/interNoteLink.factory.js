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
            var linkRegexp = /\[\[(.*)\]\]/g;
            var linkMatch = linkRegexp.exec(noteText);
            var linksToBeFixed = [];

            if(linkMatch) {
                linksToBeFixed.push({
                    linkMatch: linkMatch[0],
                    fixedLink: getFixedLink(linkMatch[1])
                });
            }

            while (linkMatch) {
                linkMatch = linkRegexp.exec(noteText);

                if (linkMatch) {
                    linksToBeFixed.push({
                        linkMatch: linkMatch[0],
                        fixedLink: getFixedLink(linkMatch[1])
                    });
                }
            }

            angular.forEach(linksToBeFixed, function (link) {
                noteText = noteText.replace(link.linkMatch, link.fixedLink);
            });

            return noteText;
        }

        function getFixedLink (linkName) {
            var fixedLink = linkName.replace(' ', '%20');

            return '[' + linkName + '](/#/viewNote/' + fixedLink + ')';
        }
    }
})();
