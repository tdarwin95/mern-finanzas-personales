const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = Schema({
	name:{
		type:String,
		
	},

	email: {
		type:String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	fecha_nac: {
		type:Date,
		default: Date.now(),
	},

	img: {
		type:String,
		
	},

	admin: {
		type:Boolean,
		required: true,
	}

})

module.exports = mongoose.model('User', userSchema)