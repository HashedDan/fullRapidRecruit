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
				url: 'http://34.203.219.137/g4/api/logout'
				})
				.then(function(response) {
					//code to execute on success
					$location.path('/login');
				})
				.catch(function(err) {
					//code to execute on error
				});
		};


		$http.get('http://34.203.219.137/g4/api/organizations')
			.success(function(result) {
				$scope.organizations = result;
			})
			.error(function(data, status) {
				$log.info(data);
			});

	});