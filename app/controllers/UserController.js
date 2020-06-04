const User = require ('../models/User')

function getUser(req, res) {
	var userId = req.params.userId

	User.findById(userId, function (err, user) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!user) return res.status(404).send({mensaje: 'No existen registros en la base de datos'})

		res.status(200).send({user:user})
	})
}

function getUsers(req, res) {
	User.find({}, function (err, users) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!users) return res.status(404).send({mensaje: 'No existen registros en la base de datos'})

		res.status(200).send({users:users})
	})
}

function saveUser(req, res) {
	//imprimir el cuerpo del mensaje en consola
	console.log(req.body)

	//creamos un esquema de tipo Articulo
	var user = new User()

	//guardamos datos del body del mensaje en el esquema
	user.name = req.body.name
	user.email = req.body.email
	user.password = req.body.password
	user.fecha_nac = req.body.fecha_nac
	user.img = req.body.img
	user.admin = req.body.admin

	//guardamos en la base de datos
	user.save(function(err, userStored) {
		if(err) res.status(500).send({mensaje:'Error al insertar usuario'})

		res.status(200).send({status: 'Usuario Guardado'})
	})
}

function updateUser(req, res) {
	var userId = req.params.userId
	var update = req.body

	User.findByIdAndUpdate(userId, update, function (err, userUpdated) {
		if (err) res.status(500).send({mensaje:'Error al actualizar el usuario'})

		res.status(200).send({status:'Ususario Actualizado'})
	})
}

function deleteUser(req, res) {
	var userId = req.params.userId

	User.findById(userId, function (err, user) {
		if(err) res.status(500).send({mensaje:'usuario no existe'})

		user.remove(function (err) {
			if (err) res.status(500).send({mensaje:'error al eliminar el usuario'})

			res.status(200).send({status:'Usuario Eliminado'})
		})
	})
}



module.exports = {

	getUser,
	getUsers,
	saveUser,
	updateUser,
	deleteUser

}