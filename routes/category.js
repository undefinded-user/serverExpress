const express = require('express')
const router = express.Router()
const slugify = require('slugify')

const { adminCheck, authCheck }  = require('../middlewares/auth')
const { create, update, read, remove, list, getSubs } = require('../controllers/category')


router.post('/category', authCheck, adminCheck, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.put('/category/:slug', authCheck, adminCheck, update)
router.delete('/category/:slug', authCheck, adminCheck, remove)
router.get('/category/subs/:_id', getSubs)

module.exports = router