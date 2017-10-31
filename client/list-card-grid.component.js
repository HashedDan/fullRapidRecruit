//very similar to tutorial
angular.
  module('myApp').
  component('listCardGrid', {
    templateUrl: 'list-card-grid.html',
    controller:
      function listCardGridController($routeParams, $scope, $http) {
              //this needs to figure out what page you are on then pull the correct data to populate the cards
              $scope.urlHash = location.hash.toString();
              $scope.view = $scope.urlHash.replace(/\#\!\//, '');
              console.log($scope.view);
              //there should be a root scope variable that the controller for list card grid will use to know which query to run
              $http.get('/api/lists')
                      .success(function(result) {
                          $scope.lists = result;
                      })
                      .error(function(data, status) {
                          $log.info(data);
                      });
                      $scope.open = function(){
                              console.log('hey');
                      };
      }


  });
