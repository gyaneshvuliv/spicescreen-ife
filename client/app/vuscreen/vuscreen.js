
'use strict';
// defining routes here
angular.module('VuscreenApp')
  	.config(['$stateProvider', '$urlRouterProvider','$locationProvider',function ($stateProvider, $urlRouterProvider,$locationProvider) {
    $stateProvider
        .state('IFE-registration', {
            url: '/IFE-registration',
            templateUrl: 'app/vuscreen/vuscreen.html'
        })
  }]);