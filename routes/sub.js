const express = require('express')
const router = express.Router()
const slugify = require('slugify')

const { adminCheck, authCheck }  = require('../middlewares/auth')
const { create, update, read, remove, list } = require('../controllers/sub')


router.post('/sub', authCheck, adminCheck, create)
router.get('/subs', list)
router.get('/sub/:slug', read)
router.put('/sub/:slug', authCheck, adminCheck, update)
router.delete('/sub/:slug', authCheck, adminCheck, remove)

module.exports = router