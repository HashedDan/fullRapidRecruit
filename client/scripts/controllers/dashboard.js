'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
	.controller('DashboardCtrl', function($scope, $state, $http, $location, $window) {
		$scope.$state = $state;

		//Need these to be instantiated when the scope is first loaded. They will be set later by functions below.
		$scope.active_votes_exclude_submitted = {};
		$scope.active_votes = {};
		$scope.drafted_votes = {};

		$scope.menuItems = [];
		angular.forEach($state.get(), function(item) {
			if (item.data && item.data.visible) {
				$scope.menuItems.push({
					name: item.name,
					text: item.data.text
				});
			}
		});
	
		$scope.openSignIn = function(eventId) {
			var baseUrl = "http://34.203.219.137/g4/signin/";
			var fullUrl = String(baseUrl) + String(eventId);
			$window.open(fullUrl, '_blank');
		};
	
		//Checks the currently selected list on the Active Votes view to see if there are any active votes. If not, show Admin Message.
		$scope.checkForActiveVotes = function() {
			if ($scope.active_votes_exclude_submitted.data.length < 1) {
				return false;
			} else {
				return true;
			}
		};

		//Checks the select element on the Active Votes view to see if a list has been selected. If not, show Admin Message.
		$scope.checkForListSelection = function() {
			if ($scope.selectedListForActiveVotes) {
				return true;
			} else {
				return false;
			}
		};

		//Redirects user to new-vote view on button click.
		$scope.newVote = function() {
			$location.path('/dashboard/new-vote');
		};

		//Redirects user to new-list on button click.
		$scope.newList = function() {
			$location.path('/dashboard/new-list');
		};

		//Redirects user to new-event view on button click.
		$scope.newEvent = function() {
			$location.path('/dashboard/new-event');
		};

		//Redirects user to vote-history view on button click.
		$scope.voteResults = function() {
			$location.path('/dashboard/vote-history');
		};

		//Redirects user to new-batch-vote view on button click.
		$scope.newBatchVote = function() {
			$location.path('/dashboard/new-batch-vote');
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

		$scope.createNewList = function(listName) {
			var dataObj = {};
			dataObj.list_name = listName;

				$http({
					method: 'POST',
					url: '/api/lists',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {

				$http.get('/api/lists')
					.success(function(result) {
						$scope.lists = result;
					})
					.error(function(data, status) {
					});
					$location.path('/dashboard/lists');
				})
				.catch(function(err) {
					//response when failure
				});
		};

		$scope.logVoteRecord = function(voteId, voteValue) {
			var dataObj = {};
			dataObj.vote_id = voteId;
			dataObj.vote_value = voteValue;

			$http({
					method: 'POST',
					url: '/api/post_vote_record',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					$scope.getActiveVotesFromListExcludeSubmitted($scope.selected_list);
					$scope.getActiveVotesFromList($scope.selected_list);
				})
				.catch(function(err) {

				});
		};

		$scope.getVoteHistoryFromList = function(data) {
			var dataObj = {};

			$scope.selected_list = data;

			dataObj.list_id = data;

			$http({
					method: 'POST',
					url: '/api/vote_history_from_list',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					$scope.vote_history = response;
				})
				.catch(function(err) {

				});
		};

		//Used to populate the active votes on the Active Votes tab with all currently active votes that the logged in member has not voted on.
		$scope.getActiveVotesFromListExcludeSubmitted = function(data) {
			var dataObj = {};
			$scope.selected_list = data;
			dataObj.list_id = data;

			$http({
					method: 'POST',
					url: '/api/active_votes_from_list_exclude_submitted',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					$scope.active_votes_exclude_submitted = response;
					$scope.selectedListForActiveVotes = data;
					$scope.selectedListForVoteHistory = data;
					$scope.getActiveVotesFromList($scope.selected_list);
					$scope.getDraftedVotesFromList($scope.selected_list);
				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		};

		$scope.tallyVoteResults = function(voteId, voteThreshold) {
			var dataObj = {};
			dataObj.vote_id = voteId;

			$http({
					method: 'POST',
					url: '/api/tally_vote_results',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					$scope.calculateResults(response.data[0].a, response.data[0].b, voteId, voteThreshold);
				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		};

		$scope.createNewEvent = function(listId, eventName, eventLocation, intReqFields, newEventComments) {
			var dataObj = {};
			dataObj.list_id = listId;
			dataObj.event_name = eventName;
			dataObj.event_location = eventLocation;

			var comments = 0;
			if(newEventComments) {
				comments = 1; }

			//var reqFields = String(intReqFields) + String(comments);
			//We will return to the method above when we provide the option for selecting the number of fields on the interaction log.
			
			var reqFields = String("1") + String(comments);
			
			//var sign_in_link = "34.203.219.137/g4/dashboard/signin/"+$scope.organizations[0].org_name+"/"+eventName+

			dataObj.int_req_fields = reqFields;
			
			$scope.testing_data = dataObj;

			$http({
					method: 'POST',
					url: '/api/events',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					$scope.reloadEvents(listId);
					$location.path('/dashboard/events');
				})
				.catch(function(err) {
					//response when failure
				});

		};

		$scope.reloadEvents = function(listId) {
			var dataObj = {};
			dataObj.list_id = listId;


			$http({
					method: 'POST',
					url: '/api/events_from_list',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					$scope.events_for_list = response;
					$scope.selectedListForEventsPage = listId;
				})
				.catch(function(err) {
					//response when failure
				});
		};

		$scope.calculateResults = function(a, b, voteId, voteThreshold) {
			var dataObj = {};
			var percentage = (a/b);
			var outcome = 0;
			var c = (voteThreshold/100);

			$scope.test_percentage = percentage;
			$scope.test_threshold = c;

			if(percentage > c){
				outcome = 1;
			} else if(percentage < c){
				outcome = 0;
			} else if(percentage == c){
				outcome = 2;
			}
			dataObj.vote_result = outcome;
			dataObj.vote_id = voteId;

			$http({
					method: 'POST',
					url: '/api/post_vote_results',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					//$scope.testing_tally = response;
					$scope.getVoteHistoryFromList($scope.selected_list);
				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		}

		//Used to change the status of a vote from drafted to active to archived, and vice-versa.
		$scope.changeVoteStatus = function(vote, list, newStatus) {
			$scope.active_votes = "";
			$scope.drafted_votes = "";
			var dataObj = {};
			dataObj.vote_id = vote;
			dataObj.new_status = newStatus;

			$http({
					method: 'POST',
					url: '/api/change_vote_status',
					data: dataObj,
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					$scope.getActiveVotesFromList($scope.selected_list);
					$scope.getActiveVotesFromListExcludeSubmitted($scope.selected_list);
					$scope.getDraftedVotesFromList($scope.selected_list);
					$scope.getVoteHistoryFromList($scope.selected_list);
				})
				.catch(function(err) {});
		}

		//Used to create an individual vote for a recruit within a list from the new-vote view.
		$scope.createIndividualVote = function(list, recruit, percent, abstain) {
			var dataObj = {};

			dataObj.on = recruit;
			dataObj.abstain = abstain;
			dataObj.threshold = percent;
			dataObj.listId = list;
			dataObj.status = 0;

			if (!dataObj.abstain) {
				dataObj.abstain = "False";
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
					$location.path('/dashboard/vote-editor');
				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		};

		//Used to iteratively create a group of votes for all recruits within a lists from the new-batch-votes view.
		$scope.createBatchVote = function(list, percent, abstain) {
			var dataObj1 = {};
			var dataObj2 = {};

			dataObj1.list_id = list;

			for (var i = 0; i < $scope.recruits_for_batch_vote.data.length; i++) {

				var dataObj2 = {};

				dataObj2.abstain = abstain;
				dataObj2.threshold = percent;
				dataObj2.on = $scope.recruits_for_batch_vote.data[i].recruit_id;
				dataObj2.listId = list;
				dataObj2.status = 0;

				if (!dataObj2.abstain) {
					dataObj2.abstain = "False";
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
						$location.path('/dashboard/vote-editor');
					})
					.catch(function(err) {
						//console.log("Couldn't find recruits for the specified list.");
					});
			}

			$scope.getDraftedVotesFromList(list);
			$scope.getActiveVotesFromList(list);

		};

		//Used to get all drafted votes for the selected list within an organization.
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
					$scope.selectedListForVotesPage = data;
					$scope.selectedListForActiveVotes = data;
					$scope.selectedListForVoteHistory = data;
				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		};

		//Used to get all active votes from the selected list within an organization, regardless of if the logged in user has voted on that recruit or not.
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
					$scope.selectedListForVotesPage = data;
					$scope.selectedListForActiveVotes = data;
					$scope.selectedListForVoteHistory = data;

				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		};

		//Used to get list of all recruits from a selected list.
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
					$scope.recruits_for_interaction = response;
				})
				.catch(function(err) {
					//console.log("Couldn't find recruits for the specified list.");
				});
		};

		//Redirects user to new-interaction view on button click, also calls getRecruitsFromList(selectedListForEventsPage)
		$scope.newInteraction = function(eventID) {
			$scope.getRecruitsFromList($scope.selectedListForEventsPage);
			$scope.interactionOnEventID = eventID;
			$location.path('/dashboard/new-interaction');

		};

		$scope.newInteractionLog = function() {
			// var elements = document.getElementsByClassName("class-1");
			// for (var i = 0, len = elements.length; i < len; i++) {
			//     // elements[i].style ...
			// }

			$scope.interactionRadioBtns = document.getElementsByClassName("interaction-radio");
			$scope.interactionRadioBtnsLen = $scope.interactionRadioBtns.length;
			for (var i = 0; i < $scope.interactionRadioBtnsLen; ++i) {
				if ($scope.interactionRadioBtns[i].checked) {
					
					var dataObjInteraction = {};

					dataObjInteraction.interactionOnEventID = $scope.interactionOnEventID;
					dataObjInteraction.interaction_recruit = $scope.interactionRadioBtns[i].name;
					dataObjInteraction.interaction_score1 = $scope.interactionRadioBtns[i].id;




					$http({
							method: 'POST',
							url: '/api/interactions_records',
							data: dataObjInteraction,
							headers: {
								'Content-Type': 'application/json'
							}
						})
						.then(function(response) {
							//$scope.vote_success = "New Vote Successfully Created!";
							$location.path('/dashboard/events');
						})
						.catch(function(err) {
							//console.log("Couldn't find recruits for the specified list.");
						});

				}

			}

		}

	});
