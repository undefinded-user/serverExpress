const express = require('express')

const router = express.Router()

router.get('/create-update-user', (req, res) => {
	res.json({
		message: 'This is create and update users page'
	})
})

module.exports = router