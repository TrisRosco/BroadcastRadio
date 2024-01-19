const { Router } = require('express')

const router = new Router()

require('./artist')(router)

module.exports = router;
