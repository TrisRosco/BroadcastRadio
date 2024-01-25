const express = require("express");
const router = express.Router();

router.use(express.json()); // This parces the body of the request into JSON
// It took a while to figure out why the body of the request was coming back as undefined, but I eventually found out that I needed to use this line of code to parse the body of the request into JSON.

require("./artist")(router);

module.exports = router;
