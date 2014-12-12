/* global angular, console */

(function () {
    'use strict';

    angular
        .module('navigationPanel')
        .controller('NavigationPanelController', NavigationPanelController);

    function NavigationPanelController () {
        var vm = this;
        vm.tab = 1;
    }
})();
