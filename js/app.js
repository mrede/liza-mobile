// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])

.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      
      config.headers = config.headers || {};
      if (window.localStorage.getItem('token') ) {
        console.log("YES WITH AUTH")
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token');
      }
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      console.log("YUP ", config, $window.sessionStorage.token)
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
})


.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
    
    $stateProvider
      .state('signin', {
        url: "/sign-in",
        templateUrl: "templates/sign-in.html",
        controller: 'SignInCtrl'
      })
      .state('forgotpassword', {
        url: "templates/forgot-password",
        templateUrl: "forgot-password.html"
      })
      .state('tabs', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })
      .state('tabs.dashboard', {
        url: "/dashboard",
        views: {
          'dashboard-tab': {
            templateUrl: "templates/dashboard.html",
            controller: 'DashboardCtrl'
          }
        }
      })
      .state('tabs.bucket', {
        url: '/bucket/:bucket',
        views: {
          'dashboard-tab': {
            templateUrl: 'templates/bucket.html',
            controller: 'BucketCtrl'
          }
        }
      })
    
    ;


   $urlRouterProvider.otherwise("/sign-in");

  // Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  $httpProvider.defaults.headers.common['auth-token'] = 'C3PO R2D2';
  // Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $httpProvider.interceptors.push('authInterceptor');
  

});

