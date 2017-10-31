//very similar to tutorial
angular.
  module('myApp').
  component('listViewActive', {
    templateUrl: 'list-view-active.html',
    controller:
      function listViewActiveController($routeParams, $scope, $http) {




      // for (var id in obj) {
      //   if (obj.hasOwnProperty(prop)) {
      //
      //   }
      // }

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
