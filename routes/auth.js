const express = require('express')

const router = express.Router()

//middlewares
const { authCheck } = require('../middlewares/auth.js')

//controller
const { createOrUpdateUser } = require('../controllers/auth')

// create route
router.post('/create-update-user', authCheck,  createOrUpdateUser)

// export route
module.exports = router