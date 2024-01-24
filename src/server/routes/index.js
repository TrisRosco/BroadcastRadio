const express = require('express');
const router = express.Router();

// This line is needed to parse the body of incoming POST requests
router.use(express.json());

require('./artist')(router);

module.exports = router;