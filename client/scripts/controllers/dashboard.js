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
			  
	$scope.activateVote = function(vote, list) {
		$scope.active_votes = "";
		$scope.drafted_votes = "";
		var dataObj = {};
		dataObj.vote_id = vote;
				
		$http({
				method: 'POST',
				url: '/api/activate_vote',
				data: dataObj,
				headers: {
					'Content-Type': 'application/json'
				}
				})
				.then(function(response) {
					$scope.getActiveVotesFromList($scope.selected_list);
					$scope.getDraftedVotesFromList($scope.selected_list);
				})
				.catch(function(err) {
				});
	}
			  
	$scope.createIndividualVote = function(list, recruit, percent, abstain) {
		var dataObj = {};
		
		dataObj.on = recruit;
		dataObj.abstain = abstain;
		dataObj.threshold = percent;
		dataObj.listId = list;
		dataObj.status = 0;
		
		if(!dataObj.abstain){
			dataObj.abstain = "false";
		}
		
		$scope.vote_post = dataObj;
	
			$http({
					method: 'POST',
					url: '/api/votes',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					//$scope.vote_success = "New Vote Successfully Created!";
					$scope.getDraftedVotesFromList(list);
					$scope.getActiveVotesFromList(list);
					$location.path('/dashboard/votes');
				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		};
		
	$scope.createBatchVote = function(list, percent, abstain) {
		var dataObj1 = {};
		var dataObj2 = {};
		
		dataObj1.list_id = list;
		
		for(var i = 0; i<$scope.recruits_for_batch_vote.data.length; i++){
			
			var dataObj2 = {};
			
			dataObj2.abstain = abstain;
			dataObj2.threshold = percent;
			dataObj2.on = $scope.recruits_for_batch_vote.data[i].recruit_id;
			dataObj2.listId = list;
			dataObj2.status = 0;
			
			if(!dataObj2.abstain){
				dataObj2.abstain = "false";
			}
			
			$http({
					method: 'POST',
					url: '/api/votes',
					data: dataObj2,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					//$scope.vote_success = "New Vote Successfully Created!";
					$location.path('/dashboard/votes');
				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		}
		
		$scope.getDraftedVotesFromList(list);
		$scope.getActiveVotesFromList(list);
		
		};

	$scope.getDraftedVotesFromList = function(data) {
		var dataObj = {};
		
		$scope.selected_list = data;
		
		dataObj.list_id = data;
				
		$http({
					method: 'POST',
					url: '/api/drafted_votes_from_list',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					$scope.drafted_votes = response;
				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		};
	
	$scope.getActiveVotesFromList = function(data) {
		var dataObj = {};
		
		$scope.selected_list = data;
		
		dataObj.list_id = data;
		
		$http({
					method: 'POST',
					url: '/api/active_votes_from_list',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					$scope.active_votes = response;
				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		};
		
	$scope.getRecruitsFromList = function(data) {
		var dataObj = {};

			dataObj.list_id = data;
			
			$http({
					method: 'POST',
					url: '/api/recruits_from_list',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					$scope.recruits_dropdown_results = response;
					$scope.recruits_for_batch_vote = response;
				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		};

	});
