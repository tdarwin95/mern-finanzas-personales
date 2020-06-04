const mongoose = require('mongoose')
const Schema = mongoose.Schema


const activitySchema = Schema({
	title:{
		type:String,
	},

	description: {
		type:String,
	},

	amount: {
		type: Number,
	},

	fecha: {
		type:Date,
		default: Date.now(),
	},

	type: {
		type:String,
	},

	category: {
		type:String,
	},

	currency: {
		type:String,
	},

	userId: {
		type:String,
	},


})

module.exports = mongoose.model('Activity', activitySchema)