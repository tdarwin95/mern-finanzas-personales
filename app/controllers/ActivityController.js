const Activity = require ('../models/Activity')

function getActivity(req, res) {
	var activityId = req.params.activityId

	Activity.findById(activityId, function (err, activity) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!activity) return res.status(404).send({mensaje: 'No existen registros en la base de datos'})

		res.status(200).send({activity:activity})
	})
}

function getActivities(req, res) {

	var userId = req.params.userId

	Activity.find({userId:userId}, function (err, activities) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!activities) return res.status(404).send({mensaje: 'No existen registros en la base de datos'})

		res.status(200).send({activities:activities})
	})
}

function saveActivity(req, res) {
	//imprimir el cuerpo del mensaje en consola
	console.log(req.body)

	//creamos un esquema de tipo Articulo
	var activity = new Activity()

	//guardamos datos del body del mensaje en el esquema
	activity.title = req.body.title
	activity.description = req.body.description
	activity.amount = req.body.amount
	activity.type = req.body.type
	activity.category = req.body.category
	activity.currency = req.body.currency
	activity.userId = req.body.userId

	//guardamos en la base de datos
	activity.save(function(err, activityStored) {
		if(err) res.status(500).send({mensaje:'Error al insertar la actividad'})

		res.status(200).send({status: 'Actividad Guardada'})
	})
}

function updateActivity(req, res) {
	var activityId = req.params.activityId
	var update = req.body

	Activity.findByIdAndUpdate(activityId, update, function (err, activityUpdated) {
		if (err) res.status(500).send({mensaje:'Error al actualizar la actividad'})

		res.status(200).send({status:'Actividad Actualizada'})
	})
}

function deleteActivity(req, res) {
	var activityId = req.params.activityId

	Activity.findById(activityId, function (err, activity) {
		if(err) res.status(500).send({mensaje:'actividad no existe'})

		activity.remove(function (err) {
			if (err) res.status(500).send({mensaje:'error al eliminar la actividad'})

			res.status(200).send({status:'Actividad Eliminada'})
		})
	})
}



module.exports = {

	getActivity,
	getActivities,
	saveActivity,
	updateActivity,
	deleteActivity

}