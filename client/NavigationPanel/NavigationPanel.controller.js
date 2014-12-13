/* global angular, console */

(function () {
    'use strict';

    angular
        .module('navigationPanel')
        .controller('NavigationPanelController', NavigationPanelController);

    NavigationPanelController.$inject = ['$scope', 'subscriptionService'];

    function NavigationPanelController ($scope, subscriptionService) {
        var vm = this;
        vm.tab = 1;

        subscriptionService.onEditNote($scope, function () {
            vm.tab = -1;
        });

        subscriptionService.onGoToOverview($scope, function () {
            vm.tab = 1;
        });
    }
})();
