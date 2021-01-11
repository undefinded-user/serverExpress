const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const subSchema = new mongoose.Schema({
	name:{
		type: String,
		trim: true,
		required: 'Name is required',
		minlength: [3, 'Too short'],
		maxlength: [25, 'Too long']
	},
	slug:{
		type: String,
		trim: true,
		unique: true,
		lowercase: true,
		index: true
	},
	parent:{
		type: ObjectId,
		ref: 'Category',
		required: 'Parent is required'
	}
}, {timestamps: true})

module.exports = mongoose.model('Sub', subSchema)