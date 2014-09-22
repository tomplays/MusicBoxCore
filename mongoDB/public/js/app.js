'use strict';

// Declare app level module which depends on filters, and services
angular.module('musicBox',  ['ngResource', 'musicBox.filters', 'ngRoute', 'musicBox.services', 'musicBox.directives', 'ngSanitize']).
  config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider ) {
    $routeProvider.
 	   when('/', {
        templateUrl: 'partials/document',
        controller: DocumentCtrl
      }).
      
      otherwise({
        
        redirectTo: ''
      });
      $locationProvider.html5Mode(true);
      
    // $sceDelegate.enabled(false);
     //$sceDelegateProvider.resourceUrlWhitelist(['.*']);
    }
  ]);
// instead of empty file include, but files exist #v+
// if/not included switcher
angular.module('musicBox.filters', [])
angular.module('musicBox.directives', [])


