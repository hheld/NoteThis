/*global angular*/

(function () {
    'use strict';

    angular.module('noteThis',
                   ['ngRoute',
                    'ngSanitize',
                    'noteEditor',
                    'dB',
                    'navigationPanel',
                    'subscriptionService']);
})();
