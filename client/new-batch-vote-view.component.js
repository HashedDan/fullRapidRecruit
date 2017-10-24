//very similar to tutorial
angular.
  module('myApp').
  component('newBatchVoteView', {
    templateUrl: 'new-batch-vote-view.html',
    controller:
      function newBatchVoteViewController($routeParams, $scope, $rootScope) {
              //this needs to get all lists associated with a user from the DB
              //feed that into scope so it can be used to form the drop down selector
              //the submit button needs to call a script to iterate over the entire selected list
              //and create new entries in the votes table for each






      // for (var id in obj) {
      //   if (obj.hasOwnProperty(prop)) {
      //
      //   }
      // }




      }

  });
