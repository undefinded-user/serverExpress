const express = require('express')

const router = express.Router()

router.get('/users', (req, res) => {
	res.json({
		message: 'This is users api endpoint page'
	})
})

module.exports = router