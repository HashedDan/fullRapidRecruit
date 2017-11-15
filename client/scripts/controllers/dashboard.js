'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
	.controller('DashboardCtrl', function($scope, $state, $http, $location) {
		$scope.$state = $state;

		$scope.menuItems = [];
		angular.forEach($state.get(), function(item) {
			if (item.data && item.data.visible) {
				$scope.menuItems.push({
					name: item.name,
					text: item.data.text
				});
			}
		});
		
	  $scope.newVote = function(){
		$location.path('/dashboard/new-vote'); };
		
	$scope.newEvent = function(){
		$location.path('/dashboard/new-event'); };
	  
	  $scope.voteResults = function(){
		$location.path('/dashboard/vote-history'); };
	  
	  $scope.newBatchVote = function(){
		$location.path('/dashboard/new-batch-vote'); };

      $http.get('/api/lists')
              .success(function(result) {
                  $scope.lists = result;
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

              $http.get('/api/organizations')
                      .success(function(result) {
                              console.log(result);
                          $scope.organizations = result;
                      })
                      .error(function(data, status) {
                          $log.info(data);
                      });

      $http.get('/api/events')
              .success(function(result) {
                  $scope.events = result;
              })
              .error(function(data, status) {
                  $log.info(data);
              });


	});
