/* global angular, indexedDB, console, IDBKeyRange */

(function () {
    'use strict';

    angular
        .module('dB')
        .factory('DataStorage', DataStorage);

    DataStorage.$inject = ['$q'];

    function DataStorage ($q) {
        var db;

        var dbDeferred = $q.defer();

        open();

        return dbDeferred.promise;

        // ####################################################################

        function open () {
            var req = indexedDB.open('note-this-DB', 1);

            req.onsuccess = function (event) {
                db = this.result;

                dbDeferred.resolve({
                    store: store,
                    fetchAllPromise: fetchAll,
                    fetchNotePromise: fetchNote,
                    deleteNote: deleteNote
                });
            };

            req.onupgradeneeded = function (event) {
                var storage = event.target.result;

                storage.createObjectStore('notes', {
                    keyPath: 'title',
                    autoIncrement: true
                });
            };
        }

        function store (note) {
            note.date = new Date();

            var deferedDone = $q.defer();

            var transaction = db.transaction(['notes'], 'readwrite'),
                objectStore = transaction.objectStore('notes'),
                req = objectStore.put(note);

            req.onsuccess = function (event) {
                deferedDone.resolve();
            };

            return deferedDone.promise;
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
                    notes.push({
                        value: result.value,
                        key:  result.key
                    });
                    result.continue();
                } else {
                    deferred.resolve(notes);
                }
            };

            return deferred.promise;
        }

        function fetchNote (noteId) {
            var transaction = db.transaction(['notes'], 'readonly'),
                objectStore = transaction.objectStore('notes'),
                keyRange = IDBKeyRange.only(noteId),
                req = objectStore.openCursor(keyRange);

            var note,
                deferred = $q.defer();

            req.onsuccess = function (event) {
                var result = event.target.result;

                if (result) {
                    note = result.value;
                    deferred.resolve(note);
                }
            };

            return deferred.promise;
        }

        function deleteNote (noteId) {
            var transaction = db.transaction(['notes'], 'readwrite'),
                objectStore = transaction.objectStore('notes'),
                req = objectStore.delete(noteId);

            var deferred = $q.defer();

            req.onsuccess = function (event) {
                deferred.resolve();
            };

            return deferred.promise;
        }
    }
})();
