const express = require('express');
const router = express.Router();

router.use(express.json()); // This line took me hours to figure out. At least I learned something new!

require('./artist')(router);

module.exports = router;