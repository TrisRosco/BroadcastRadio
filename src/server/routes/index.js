const express = require("express");
const router = express.Router();

router.use(express.json()); // This parces the body of the request into JSON

require("./artist")(router);

module.exports = router;
