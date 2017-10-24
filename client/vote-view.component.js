//very similar to tutorial
angular.
  module('voteView').
  component('voteView', {
    templateUrl: 'vote-view.html',
    controller:
      function voteViewController($routeParams, $scope, $rootScope) {

              $rootScope.cat = "feline";
              console.log($rootScope.cat);




      // for (var id in obj) {
      //   if (obj.hasOwnProperty(prop)) {
      //
      //   }
      // }




      }

  });
