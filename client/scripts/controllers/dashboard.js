'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
	.controller('DashboardCtrl', function($scope, $state, $http) {
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

		$scope.logout = function() {
			$http({
					method: 'POST',
					url: '/api/logout'
				})
				.then(function(response) {
					//code to execute on success
					$location.path('/login');
				})
				.catch(function(err) {
					//code to execute on error
				});
		};

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

      $http.get('/api/events')
              .success(function(result) {
                  $scope.events = result;
              })
              .error(function(data, status) {
                  $log.info(data);
              });


	});
