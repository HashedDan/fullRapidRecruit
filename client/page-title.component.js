//very similar to tutorial
angular.
  module('myApp').
  component('pageTitle', {
    templateUrl: 'page-title.html',
    controller:
      function pageTitleController($routeParams, $scope) {
       //$scope.id = $state.current;
       console.log(window.location.hash);
      var str = window.location.hash;
      var substr = str.substring(3);
      
      if(substr == "main"){
        var title = "Main Page";
      }
      if(substr == "vote"){
        var title = "Vote Page";
      }
      if(substr == "list"){
        var title = "List Page";
      }
      if(substr == "sign-in"){
        var title = "Sign In Page";
      }
      if(substr == "my-org"){
        var title = "My Organization Page";
      }
      $scope.page_id = title;
      }
  });