const Product = require('../models/product')
const slugify = require('slugify')

exports.create = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.title).toLowerCase()
		const newProduct = await new Product(req.body).save()
		res.json(newProduct)
	} catch(error) {
		return res.status(400).json({
			error: error.message,
		})
	}
}

exports.list = async (req, res) => {
	try{
		const products = await Product.find({})
		.limit(parseInt(req.params.count))
		.populate('category')
		.populate('subs')
		.sort([['createdAt', 'desc']])
		.exec()
		res.status(200).json(products)
	} catch(error) {
		res.status(400).json(error)
	}	
}
// WITHOUT PAGINATION
// exports.listSorted = async (req, res) => {
// 	try{
// 		// createdAt/updatedAt desc/asc quantity of products
// 		const {sort, order, limit} = req.body
// 		const products = await Product.find({})
// 		.sort([[sort, order]])
// 		.limit(limit)
// 		.exec()
// 		res.json(products)
// 	} catch(error) {
// 		console.log(error)
// 		res.status(400).json(error.message)
// 	}
// }

// WITH PAGINATION
exports.listSorted = async (req, res) => {
	try{
		// createdAt/updatedAt desc/asc quantity of products
		const {sort, order, page} = req.body
		const currentPage = page || 1
		const perPage = 3
		console.log(sort, order, page)

		const products = await Product.find({})
		.sort([[sort, order]])
		// SKIP PREV PAGES PRODUCTS
		.skip((currentPage -1)*perPage)
		.exec()
		res.json(products.splice(0, perPage))
	} catch(error) {
		console.log(error)
		res.status(400).json(error.message)
	}
}

exports.update = async (req, res) => {
	try{
		const {slug} = req.params
		const {product} = req.body
		console.log(slug)
		console.log(product)
		const updated = await Product.findOneAndUpdate({slug}, {...product, slug: slugify(product.title).toLowerCase()}, { new : true}).exec()
		res.status(200).json(updated)
	} catch(error) {
		res.status(400).json(error)
	}
}

exports.read = async (req, res) => {
	try{
		const slug = req.params.slug
		const result = await Product.findOne({slug}).exec()
		res.status(200).json(result)
	} catch(error) {
		res.status(400).json(error)
	}
	
}

exports.populateAndRead = async (req, res) => {
	try{
		const slug = req.params.slug
		const result = await Product.findOne({slug})
		.populate('category')
		.populate('subs')
		.exec()
		res.json(result)
	} catch(error) {
		res.status(400).json(error)
	}
}

exports.remove = async (req, res) => {
	try{
		const slug = req.params.slug
		const deleted = await Product.findOneAndDelete({slug}).exec()
		res.status(200).json(deleted)
	} catch(error) {
		console.log(error)
		res.status(400).send('Product delete failed')
	}
}


exports.productsCount = async (req, res) => {
	try{
		const total = await Product.find({}).estimatedDocumentCount().exec()
		res.json(total)
	} catch(error) {
		consolellog(error)
		res.status(400).send('Get products total failed')
	}
}

