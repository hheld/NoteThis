/*global angular*/

(function () {
    'use strict';

    angular.module('NoteThis')
        .controller('NoteEditRouteController', NoteEditRouteController);

    NoteEditRouteController.$inject = ['$routeParams'];

    function NoteEditRouteController($routeParams) {
        var vm = this;
        vm.noteId = $routeParams.noteId;
    }
})();
