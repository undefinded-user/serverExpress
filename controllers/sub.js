const Sub = require('../models/sub')
const slugify = require('slugify')

exports.create = async (req, res) => {
	try {
		const {name, parent} = req.body
		console.log(parent)
		console.log(name)
		const sub = await new Sub({name, slug: slugify(name), parent}).save()
		console.log('Sub must be here', sub)
		res.json(sub)
	} catch(error) {
		return res.status(400).send('Create sub falied')
	}
}

exports.list = async (req, res) => {
	try{
		const sub = await Sub.find({}).sort({createdAt : -1 }).exec()
		res.status(200).json(sub)
	} catch(error) {
		res.status(400).json(error)
	}
	
	
}

exports.update = async (req, res) => {
	try{
		const {slug} = req.params
		const {name, parent} = req.body
		console.log(parent)
		const updated = await Sub.findOneAndUpdate({slug}, {name, slug: slugify(name), parent}, { new : true}).exec()
		res.status(200).json(updated)
	} catch(error) {
		console.log(error)
		res.status(400).send('Sub update failed')
	}
}

exports.read = async (req, res) => {
	try{
		const slug = req.params.slug
		const result = await Sub.findOne({slug}).exec()
		res.status(200).json(result)
	} catch(error) {
		res.status(400).json(error)
	}
	
}

exports.remove = async (req, res) => {
	try{
		const slug = req.params.slug
		const deleted = await Sub.findOneAndDelete({slug}).exec()
		res.status(200).json(deleted)
	} catch(error) {
		res.status(400).json('Sub category delete failed')
	}
}

