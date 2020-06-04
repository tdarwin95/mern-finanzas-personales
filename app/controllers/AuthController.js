const User = require ('../models/User')
const config = require ('../config/config')
const jwt = require('jsonwebtoken')

function registerUser(req, res) {
	//creamos un esquema de tipo Articulo
	var user = new User()
	//guardamos datos del body del mensaje en el esquema
	user.email = req.body.email
	user.password = req.body.password
	user.admin = false

	//guardamos en la base de datos
	user.save()

	//creamos el token del usuario que se esta registrando
	//pasamos el id
	//la llave secreta
	//configuramos el tiempo en que expirara el token
	const token = jwt.sign({id: user._id}, config.secret, {
		expiresIn: 60*60*24
	})

	//enviamos la respuesta, autenticado y token
	//res.status(200).send({auth: true, token: token})

	res.status(200).send({status: 'Usuario registrado'})
}

function loginUser(req, res) {
	
	var email = req.body.email
	var password = req.body.password
	console.log(email)
	console.log(password)


	User.findOne({email:email}, function (err, user) {
		if(err) return res.status(500).send({status: 'Error al realizar la peticion'})
		if(!user) return res.status(404).send({status: 'No existen registros en la base de datos'})

		console.log(user)
		if(user.password == password){

			//podriamos crear un token

			res.status(200).send({user:user})
		}else{
			res.status(401).send({status:'contraseña incorrecta'})
		}


	})

}

function profileUser(req, res) {
	
	//obtenemos el token desde la cabesera de la eticion
	const token = req.headers['x-acces-token']

	//si no se envia un token, retornamos este mensaje
	if(!token) {
		return res.status(401).json({
			auth: false,
			message: 'No ha provisto un token de acceso'
		})
	}

	//si existe un token verificamos que coincida y obtenemos el id de usuario
	const decoded = jwt.verify(token, config.secret)
	console.log(decoded)

	//buscamos si existe el usuario en la base de datos
	User.findById(decoded.id, function (err, user) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!user) return res.status(404).send({mensaje: 'No existen registros en la base de datos'})

		res.status(200).send({user:user})
	})
}

module.exports = {

	registerUser,
	loginUser,
	profileUser,

}