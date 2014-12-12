/* global angular, Markdown, console */

(function () {
    'use strict';

    angular
        .module('navigationPanel')
        .directive('navigationPanel', navigationPanel);

    function navigationPanel() {
        var setup = {
            restrict: 'E',
            templateUrl: 'NavigationPanel/NavigationPanel.html',
            controller: 'NavigationPanelController',
            controllerAs: 'ctrl',
        };

        return setup;
    }
})();
