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

/*
	RECRUITS ROUTES
*/
router.get('/recruits', authFuncs.loginRequired, requestHandler.getRecruits);
router.post('/recruits', authFuncs.loginRequired, requestHandler.postRecruits);

/*
	INTERACTIONS ROUTES
*/
router.get('/interactions', authFuncs.loginRequired, requestHandler.getInteractions);

/*
	INTERACTIONS_RECORDS ROUTES
*/
router.get('/interactions_records', authFuncs.loginRequired, requestHandler.getInteractionsRecords);

/*
	SIGN_IN ROUTES
*/
router.get('/sign_in', authFuncs.loginRequired, requestHandler.getSignIn);

/*
	VOTES ROUTES
*/
router.get('/votes', authFuncs.loginRequired, requestHandler.getVotes);
router.post('/votes', authFuncs.loginRequired, requestHandler.postVotes);

/*
	VOTES_RECORDS ROUTES
*/
router.get('/vote_records', authFuncs.loginRequired, requestHandler.getVoteRecords);

/*
	SHARE ROUTES
*/
router.get('/share', authFuncs.loginRequired, requestHandler.getShare);

module.exports = router;