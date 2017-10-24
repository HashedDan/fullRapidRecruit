//very similar to tutorial
angular.
  module('myOrgView').
  component('myOrgView', {
    templateUrl: 'my-org-view.html',
    controller:
      function myOrgController($routeParams, $scope, $http) {
              //this needs to figure out what page you are on then pull the correct data to populate the cards
              $scope.urlHash = location.hash.toString();
              $scope.view = $scope.urlHash.replace(/\#\!\//, '');

              $http.get('/api/organizations')
                      .then(function successCallback(result) {
                          $scope.organization = result.data;
                      }, function errorCallback(data, status) {
                          $log.info(data);
                      });
              
              $http.get('/api/members')
                      .then(function successCallback(result) {
                          $scope.members = result.data;
                      }, function errorCallback(data, status) {
                          $log.info(data);
                      });
      }

  });
