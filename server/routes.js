const router = require('express').Router();
const requestHandler = require('./requests/request-handler.js');
const authFuncs = require('./auth/auth-functions.js');

/*
	LOGIN ROUTES
*/
router.post('/register', authFuncs.loginRedirect, requestHandler.register);
router.post('/login', authFuncs.loginRedirect, requestHandler.login);
router.get('/logout', authFuncs.loginRequired, requestHandler.logout);

/*
	ORGANIZATION ROUTES
*/
router.get('/organizations', authFuncs.loginRequired, requestHandler.getOrganizations);

/*
	MEMBERS ROUTES
*/
router.get('/members', authFuncs.loginRequired, requestHandler.getMembers);
router.post('/member_from_id', authFuncs.loginRequired, requestHandler.memberFromId);
router.post('/remove_admin', authFuncs.loginRequired, requestHandler.removeAdmin);
router.post('/new_admin', authFuncs.loginRequired, requestHandler.newAdmin);
router.get('/members_with_admin', authFuncs.loginRequired, requestHandler.memberWithAdmin);
/*
	LISTS ROUTES
*/
router.get('/lists', authFuncs.loginRequired, requestHandler.getLists);
router.post('/lists', authFuncs.loginRequired, requestHandler.postLists);

/*
	EVENTS ROUTES
*/
router.get('/events', authFuncs.loginRequired, requestHandler.getEvents);
router.post('/events', authFuncs.loginRequired, requestHandler.postEvents);
router.post('/events_from_list', authFuncs.loginRequired, requestHandler.eventsFromList);

/*
	RECRUITS ROUTES
*/
router.get('/recruits', authFuncs.loginRequired, requestHandler.getRecruits);
router.post('/recruits', authFuncs.loginRequired, requestHandler.postRecruits);
router.post('/recruits_from_list', authFuncs.loginRequired, requestHandler.postRecruitsFromList);
router.post('/recruits_from_list_event', authFuncs.loginRequired, requestHandler.postRecruitsFromListEvent);


/*
	INTERACTIONS ROUTES
*/
router.get('/interactions', authFuncs.loginRequired, requestHandler.getInteractions);

/*
	INTERACTIONS_RECORDS ROUTES
*/
router.get('/interactions_records', authFuncs.loginRequired, requestHandler.getInteractionsRecords);
router.post('/interactions_records', authFuncs.loginRequired, requestHandler.postInteractionRecords);
router.post('/interactions_from_event', authFuncs.loginRequired, requestHandler.interactionsFromEvent);



/*
	SIGN_IN ROUTES
*/
router.get('/sign_in', authFuncs.loginRequired, requestHandler.getSignIn);
router.post('/sign_in', requestHandler.postSignIn);

/*
	VOTES ROUTES
*/
router.get('/votes', authFuncs.loginRequired, requestHandler.getVotes);
router.post('/votes', authFuncs.loginRequired, requestHandler.postVotes);
router.post('/drafted_votes_from_list', authFuncs.loginRequired, requestHandler.postDraftedVotesFromList);
router.post('/active_votes_from_list', authFuncs.loginRequired, requestHandler.postActiveVotesFromList);
router.post('/change_vote_status', authFuncs.loginRequired, requestHandler.changeVoteStatus);
router.post('/active_votes_from_list_exclude_submitted', authFuncs.loginRequired, requestHandler.postActiveVotesExcludeSubmitted);
router.post('/vote_history_from_list', authFuncs.loginRequired, requestHandler.voteHistoryFromList);
router.post('/post_vote_results', authFuncs.loginRequired, requestHandler.postVoteResults);

/*
	VOTES_RECORDS ROUTES
*/
router.get('/vote_records', authFuncs.loginRequired, requestHandler.getVoteRecords);
router.post('/post_vote_record', authFuncs.loginRequired, requestHandler.postVoteRecord);
router.post('/tally_vote_results', authFuncs.loginRequired, requestHandler.tallyVoteResults);

/*
	SHARE ROUTES
*/
router.get('/share', authFuncs.loginRequired, requestHandler.getShare);

module.exports = router;
