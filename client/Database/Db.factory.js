/* global angular, indexedDB, console, IDBKeyRange */

(function () {
    'use strict';

    angular
        .module('DB')
        .factory('DataStorage', DataStorage);

    DataStorage.$inject = ['$q'];

    function DataStorage ($q) {
        var db;

        open();

        return {
            store: store,
            fetchAllPromise: fetchAll
        };

        function open () {
            var req = indexedDB.open('note-this-DB', 1);

            req.onsuccess = function (event) {
                db = this.result;
            };

            req.onupgradeneeded = function (event) {
                var storage = event.target.result;

                storage.createObjectStore('notes', {
                    keyPath: 'date'
                });
            };
        }

        function store (note) {
            note.date = new Date();

            var transaction = db.transaction(['notes'], 'readwrite'),
                objectStore = transaction.objectStore('notes'),
                req = objectStore.put(note);

            req.onsuccess = function (event) {
                console.log('Stored note in DB');
            };
        }

        function fetchAll () {
            var transaction = db.transaction(['notes'], 'readonly'),
                objectStore = transaction.objectStore('notes'),
                keyRange = IDBKeyRange.lowerBound(0),
                req = objectStore.openCursor(keyRange);

            var notes = [],
                deferred = $q.defer();

            req.onsuccess = function (event) {
                var result = event.target.result;

                if (result) {
                    notes.push(result.value);
                    result.continue();
                } else {
                    deferred.resolve(notes);
                }
            };

            return deferred.promise;
        }
    }
})();
