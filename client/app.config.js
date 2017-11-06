//very similar to tutorial

angular.
  module('myApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.

        when('/login', {
          template: '<login-view></login-view>'
        }).
        when('/list-active', {
          template: '<list-view-active></list-view-active>'
        }).
        when('/list-archive', {
          template: '<list-view-archive></list-view-archive>'
        }).
        when('/vote', {
          template: '<vote-view></vote-view>'
        }).
         when('/my-org', {
          template: '<my-org-view></my-org-view>'
        }).
        when('/sign-in', {
          template: '<sign-in-view></sign-in-view>'
        }).
        when('/new-sign-in', {
          template: '<new-sign-in-view></new-sign-in-view>'
        }).
        when('/new-list', {
          template: '<new-list-view></new-list-view>'
        }).
        when('/new-vote', {
          template: '<new-vote-view></new-vote-view>'
        }).
        when('/new-batch-vote', {
          template: '<new-batch-vote-view></new-batch-vote-view>'
        }).
        otherwise('/login');
    }
  ]);
