const router = require('express').Router();
const requestHandler = require('./request-handler.js');

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
router.get('/recruits', );

/*
	INTERACTIONS ROUTES
*/
router.get('/interactions', );

/*
	INTERACTIONS_RECORDS ROUTES
*/
router.get('/interactions_records', );

/*
	SIGN_IN ROUTES
*/
router.get('/sign_in', );

/*
	VOTES ROUTES
*/
router.get('/votes', );

/*
	VOTES_RECORDS ROUTES
*/
router.get('/vote_records', );

/*
	SHARE ROUTES
*/
router.get('/share', );

module.exports = router;