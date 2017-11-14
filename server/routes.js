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
router.get('/organizations', requestHandler.getOrganizations);

/*
	MEMBERS ROUTES
*/
router.get('/members', requestHandler.getMembers);

/*
	LISTS ROUTES
*/
router.get('/lists', requestHandler.getLists);

/*
	EVENTS ROUTES
*/
router.get('/events', requestHandler.getEvents);

/*
	RECRUITS ROUTES
*/
router.get('/recruits', requestHandler.getRecruits);

/*
	INTERACTIONS ROUTES
*/
router.get('/interactions', requestHandler.getInteractions);

/*
	INTERACTIONS_RECORDS ROUTES
*/
router.get('/interactions_records', requestHandler.getInteractionsRecords);

/*
	SIGN_IN ROUTES
*/
router.get('/sign_in', requestHandler.getSignIn);

/*
	VOTES ROUTES
*/
router.get('/votes', requestHandler.getVotes);

/*
	VOTES_RECORDS ROUTES
*/
router.get('/vote_records', requestHandler.getVoteRecords);

/*
	SHARE ROUTES
*/
router.get('/share', requestHandler.getShare);

module.exports = router;