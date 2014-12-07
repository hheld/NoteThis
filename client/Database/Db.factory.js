/* global angular, indexedDB, console */

(function () {
    'use strict';

    angular
        .module('DB')
        .factory('DataStorage', DataStorage);

    function DataStorage () {
        var db;

        open();

        return {
            store: store
        };

        function open () {
            var req = indexedDB.open('note-this-DB', 1);

            req.onsuccess = function (event) {
                db = this.result;
            };

            req.onupgradeneeded = function (event) {
                var db = event.target.result;

                db.createObjectStore('notes', {
                    autoIncrement: true
                });
            };
        }

        function store (note) {
            var transaction = db.transaction(['notes'], 'readwrite'),
                objectStore = transaction.objectStore('notes'),
                req = objectStore.put(note);

            req.onsuccess = function (event) {
                console.log('Stored note in DB');
            };
        }
    }
})();
