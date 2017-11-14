'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
	.controller('MenuCtrl', function($scope, $http, $location) {

		$scope.logout = function(req, res) {
			//console.log("Function Reached.");
			$http({
				method: 'GET',
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


		$http.get('/api/organizations')
			.success(function(result) {
				$scope.organizations = result;
			})
			.error(function(data, status) {
				$log.info(data);
			});

	});