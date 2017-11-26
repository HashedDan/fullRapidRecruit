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
				
		//$scope.getMemberFromCurrentId = function() {
		//	var dataObj = {};
		//	$http({
		//			method: 'POST',
		//			url: '/api/member_from_id',
		//			data: dataObj,
		//			headers: {
		//				'Content-Type': 'application/json'
		//			}
		//		})
		//		.then(function(response) {
		//			$scope.current_user_level = response.data[0].member_level;
		//			if ($scope.current_user_level < 1) {
		//				$scope.adminAccess = false;
		//			} else {
		//				$scope.adminAccess = true;
		//			}
		//		})
		//		.catch(function(err) {
		//			//response when failure
		//		});
		//};
		//
		//$scope.getMemberFromCurrentId();
		//
		//$scope.test_name = $scope.menuItems;
		//
		//$scope.checkAccess = function(name) {
		//	if ((name == 'my-org') || (name == 'lists') || (name == 'vote-editor') || (name == 'new-list') || (name == 'new-event') || (name == 'new-vote') || (name == 'new-batch-vote') || (name == 'vote-history')) {
		//		if (!$scope.adminAccess) {
		//			$location.path('/dashboard/restricted-page');
		//		}
		//	}
		//};


		$http.get('/api/organizations')
			.success(function(result) {
				$scope.organizations = result;
			})
			.error(function(data, status) {
				$log.info(data);
			});

	});