const Category = require('../models/category')
const Sub = require('../models/sub')
const slugify = require('slugify')

exports.create = async (req, res) => {
	try {
		const {name} = req.body
		console.log(name)
		const category = await new Category({name, slug: slugify(name)}).save()
		console.log('Category must be here', category)
		res.json(category)
	} catch(error) {
		return res.status(400).send('Create category falied')
	}
}

exports.list = async (req, res) => {
	try{
		const categories = await Category.find({}).sort({createdAt : -1 }).exec()
		res.status(200).json(categories)
	} catch(error) {
		res.status(400).json(error)
	}
	
	
}

exports.update = async (req, res) => {
	try{
		const {slug} = req.params
		const {name} = req.body
		const updated = await Category.findOneAndUpdate({slug}, {name, slug: slugify(name)}, { new : true}).exec()
		res.status(200).json(updated)
	} catch(error) {
		res.status(400).send('Category update failed')
	}
}

exports.read = async (req, res) => {
	try{
		const slug = req.params.slug
		const result = await Category.findOne({slug}).exec()
		res.status(200).json(result)
	} catch(error) {
		res.status(400).json(error)
	}
	
}

exports.remove = async (req, res) => {
	try{
		const slug = req.params.slug
		const deleted = await Category.findOneAndDelete({slug}).exec()
		res.status(200).json(deleted)
	} catch(error) {
		res.status(400).json('Category delete failed')
	}
}

exports.getSubs = async (req, res) => {
	try{
		const subs = await Sub.find({parent: req.params._id}).exec()
		res.status(200).json(subs)
	} catch(error) {
		res.status(400).send('Get subs failed')
	}
}

