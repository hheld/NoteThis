/* global angular, console */

(function () {
    'use strict';

    angular
        .module('noteThis')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['DataStorage'];

    function OverviewController (DataStorage) {
        var vm = this;

        vm.notes = [];

        // ####################################################################

        DataStorage.then(function (ds) {
            ds.fetchAllPromise()
            .then(function (notes) {
                vm.notes = notes;
            });
        });
    }
})();
