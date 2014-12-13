/*global angular*/

(function () {
    'use strict';

    angular.module('noteThis')
        .controller('NoteEditRouteController', NoteEditRouteController);

    NoteEditRouteController.$inject = ['$routeParams', 'subscriptionService'];

    function NoteEditRouteController($routeParams, subscriptionService) {
        var vm = this;
        vm.noteId = $routeParams.noteId;

        subscriptionService.editNote();
    }
})();
