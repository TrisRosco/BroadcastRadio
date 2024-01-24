const express = require('express');
const router = express.Router();

router.use(express.json()); // This line took me hours to figure out. At least I learned something new!
// the issue was that I was trying to use req.body in the routes, but I didn't have this line to parse the body of the request.

require('./artist')(router);

module.exports = router;