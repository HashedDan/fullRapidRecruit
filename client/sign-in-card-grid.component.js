//very similar to tutorial
angular.
  module('myApp').
  component('signInCardGrid', {
    templateUrl: 'sign-in-card-grid.html',
    controller:
      function signInCardGridController($routeParams, $scope, $rootScope) {
              //this needs to figure out what page you are on then pull the correct data to populate the cards



              $rootScope.signIns =
              [
               {
               'name': 'Fall Rush',
               'count': '100'
               },

       ];

       $scope.signIns = $rootScope.signIns;





      // for (var id in obj) {
      //   if (obj.hasOwnProperty(prop)) {
      //
      //   }
      // }




      }

  });
