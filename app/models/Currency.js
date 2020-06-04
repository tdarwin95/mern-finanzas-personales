const mongoose = require('mongoose')
const Schema = mongoose.Schema


const currencySchema = Schema({
	name:{
		type:String,
		required:true,
	},
})

module.exports = mongoose.model('Currency', currencySchema)