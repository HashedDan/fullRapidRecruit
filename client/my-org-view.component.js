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

              $http.get('/api/organizations', {params: {id: 2}})
                      .success(function(result) {
                          $scope.organization = result;
                      })
                      .error(function(data, status) {
                          $log.info(data);
                      });
              
              $http.get('/api/members')
                      .success(function(result) {
                          $scope.members = result;
                      })
                      .error(function(data, status) {
                          $log.info(data);
                      });
      }

  });
