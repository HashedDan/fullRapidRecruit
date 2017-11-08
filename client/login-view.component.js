angular.
module('loginView').
component('loginView', {
  templateUrl: 'login-view.html',
  controller: function loginController($routeParams, $scope, $http) {

    $scope.responseMessage = "";

    $scope.createPost = function(data) {
      
      var dataObj = {};
      
      dataObj.email = data.email;
      dataObj.password = data.password;

      $http({
          method: 'POST',
          url: '/api/login',
          data: dataObj,
          headers: {'Content-Type': 'application/json'}
        })
        .then(function(response) {
          //code to execute on success
          //
          //     app.use(function (req, res, next) {
          //       req.session.org_id = [replace org id];
          //     });
          //
          // -----
          console.log(response);
          $scope.responseMessage = "Status: "+response.status+" | Status Text: "+response.statusText;
        })
        .catch(function(err) {
          //code to execute on error
          console.log(err);
          $scope.responseMessage = "Status: "+err.status+" | Status Text: "+err.statusText;
        });
    };
  }
});