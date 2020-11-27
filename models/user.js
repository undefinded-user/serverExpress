const { Schema } = require('mongoose')
const { ObjectId} = Schema

const userSchema = new Schema({
	name: String,
	email: {
		type: String,
		required: true
		index: true
	},
	role: {
		type: String,
		default: 'subscriber'
	},
	cart: {
		type: Array,
		default: []
	},
	address: String,
	// whishlist: {
	// 	type: ObjectId,
	// 	ref: 'Product'
	// }
}, {timestamps: true})

const User = new userSchema

module.exports = User