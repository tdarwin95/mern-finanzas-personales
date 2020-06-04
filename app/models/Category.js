const mongoose = require('mongoose')
const Schema = mongoose.Schema


const categorySchema = Schema({
	name:{
		type:String,
		required:true,
	},

	global: {
		type:Boolean,
	},

	userId: {
		type:String,
	},
})

module.exports = mongoose.model('Category', categorySchema)