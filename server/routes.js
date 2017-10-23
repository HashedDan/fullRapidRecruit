const router = require('express').Router();
const requestHandler = require('./request-handler.js');

/*
	GET ROUTES
*/
router.get('/organizations', requestHandler.getOrganizations);
router.get('/members', requestHandler.getMembers);
router.get('/lists', requestHandler.getLists);
router.get('/events', requestHandler.getEvents);

module.exports = router;