const express = require('express')


const router = express.Router()
// import controller
const { createOrUpdateUser } = require('../controllers/auth')
// create route
router.get('/create-update-user', createOrUpdateUser)
// export route
module.exports = router