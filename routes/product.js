const express = require('express')
const router = express.Router()
const slugify = require('slugify')

const { adminCheck, authCheck }  = require('../middlewares/auth')
const {
	 create,
	 update,
	 read,
	 populateAndRead,
	 remove,
	 list,
	 listSorted,
	 productsCount 
} = require('../controllers/product')


router.post('/product', authCheck, adminCheck, create)
router.get('/products/total', productsCount)
router.get('/products/:count', list)
router.get('/product/:slug', read)
router.get('/product/prepopulated/:slug', populateAndRead)
router.put('/product/:slug', authCheck, adminCheck, update)
router.delete('/product/:slug', authCheck, adminCheck, remove)

router.post('/products/sorted', listSorted)

module.exports = router