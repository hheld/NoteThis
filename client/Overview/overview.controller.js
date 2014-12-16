/* global angular, console, confirm */

(function () {
    'use strict';

    angular
        .module('noteThis')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['DataStorage', 'subscriptionService', '$scope'];

    function OverviewController (DataStorage, subscriptionService, $scope) {
        var vm = this;

        vm.notes = [];
        vm.filterTags = filterTags;
        vm.filterDates = filterDates;

        // ####################################################################

        DataStorage.then(function (ds) {
            updateNoteList(ds);

            subscriptionService.onNoteListChanged($scope, function () {
                updateNoteList(ds);
            });
        });

        function updateNoteList (ds) {
            ds.fetchAllPromise()
            .then(function (notes) {
                vm.notes = notes;
            });
        }

        function filterTags (element) {
            var passFilter = false;

            if (!vm.tagFilter) {
                passFilter = true;
            } else {
                var individualTags = vm.tagFilter.split(' ');

                individualTags.forEach(function (tag) {
                    if (element.value.tags.indexOf(tag) > -1) {
                        passFilter = true;
                    }
                });
            }

            return passFilter;
        }

        function filterDates (element) {
            var passFilter = false;

            if(!vm.minDateFilter && !vm.maxDateFilter) {
                passFilter = true;
            } else {
                if (vm.minDateFilter && !vm.maxDateFilter) {
                    if (element.value.date >= vm.minDateFilter) {
                        passFilter = true;
                    }
                } else if (vm.maxDateFilter && !vm.minDateFilter) {
                    if (element.value.date <= vm.maxDateFilter) {
                        passFilter = true;
                    }
                } else if (vm.minDateFilter && vm.maxDateFilter) {
                    if (element.value.date >= vm.minDateFilter &&
                        element.value.date <= vm.maxDateFilter) {
                        passFilter = true;
                    }
                }
            }

            return passFilter;
        }
    }
})();
