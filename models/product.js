const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true,
		maxlength: [32, "TooLong"],
		text: true
	},
	slug: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		index:true
	},
	description: {
		type: String,
		required: true,
		maxlength: [2000, "TooLong"],
		text: true
	},
	price: {
		type: Number,
		trim: true,
		required: true,
		maxlength: [32, "TooLong"]
	},
	category: {
		type: ObjectId,
		ref: "Category"
	},
	subs: [{
		type: ObjectId,
		ref: "Sub"
	}],
	quantity: {
		type: Number,
	},
	sold: {
		type: Number,
		default: 0
	},
	images: {
		type: Array
	},
	shipping: {
		type: String,
		enum: ["Yes", "No"],
		required: true
	},
	color: {
		type: String,
		enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
		required: true
	},
	brand: {
		type: String,
		enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"]
	},
	// ratings: [{
	// 	star: Number,
	// 	postedBy: {tyep: ObjectId, ref: 'User'}
	// }]
}, {timestamps:true})

module.exports = mongoose.model('Product', productSchema)