angular.
  module('loginView').
  component('loginView', {
    templateUrl: 'login-view.html',
    controller:
      function loginController($routeParams, $scope, $http) {
              $scope.logMeIn = function() {
              	console.log("here");
              	alert('clicked here');
              }
              
      }

  });