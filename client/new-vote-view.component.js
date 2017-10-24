//very similar to tutorial
angular.
  module('myApp').
  component('newVoteView', {
    templateUrl: 'new-vote-view.html',
    controller:
      function newVoteViewController($routeParams, $scope, $rootScope) {
              //get all lists assocaited with user from DB
              //put that into scope so that is can be used to write the lists drop down selector
              //when user triggers event "selected list," call db for all recruits in list
              //put those recruits into the drop down
              //when user triggers event  "selected recruit," set that user as the desire one
              //on submit, run script to create vote entry for this recruit


        



      // for (var id in obj) {
      //   if (obj.hasOwnProperty(prop)) {
      //
      //   }
      // }




      }

  });
