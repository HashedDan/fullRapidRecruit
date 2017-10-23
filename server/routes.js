const router = require('express').Router();
const requestHandler = require('./request-handler.js');

router.get('/organizations', requestHandler.getOrganizations);

module.exports = router;