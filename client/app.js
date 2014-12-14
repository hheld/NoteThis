/*global angular*/

(function () {
    'use strict';

    angular.module('noteThis',
                   ['ngRoute',
                    'ngSanitize',
                    'noteEditor',
                    'noteViewer',
                    'dB',
                    'navigationPanel',
                    'subscriptionService']);
})();
