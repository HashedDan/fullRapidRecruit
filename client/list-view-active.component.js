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

      $http.get('http://34.203.219.137/g4/lists')
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
