'use strict';

angular.module('VuscreenApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngMessages',
  'ui.router',
  'ngMaterial'
])
  
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,$qProvider) {
    $urlRouterProvider
      .otherwise('/IFE-registration');

    $locationProvider.html5Mode(true);
    $qProvider.errorOnUnhandledRejections(false);
  })
