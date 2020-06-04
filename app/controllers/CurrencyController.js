const Currency = require ('../models/Currency')

function getCurrency(req, res) {
	var currencyId = req.params.currencyId

	Currency.findById(currencyId, function (err, currency) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!currency) return res.status(404).send({mensaje: 'No existen registros en la base de datos'})

		res.status(200).send({currency:currency})
	})
}

function getCurriencies(req, res) {
	Currency.find({}, function (err, currencies) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!currencies) return res.status(404).send({mensaje: 'No existen registros en la base de datos'})

		res.status(200).send({currencies:currencies})
	})
}

function saveCurrency(req, res) {
	//imprimir el cuerpo del mensaje en consola
	console.log(req.body)

	//creamos un esquema de tipo Articulo
	var currency = new Currency()

	//guardamos datos del body del mensaje en el esquema
	currency.name = req.body.name

	//guardamos en la base de datos
	currency.save(function(err, currencyStored) {
		if(err) res.status(500).send({mensaje:'Error al insertar Moneda'})

		res.status(200).send({status: 'Moneda Guardada'})
	})
}

function updateCurrency(req, res) {
	var currencyId = req.params.currencyId
	var update = req.body

	Currency.findByIdAndUpdate(currencyId, update, function (err, currencyUpdated) {
		if (err) res.status(500).send({mensaje:'Error al actualizar la Moneda'})

		res.status(200).send({status:'Moneda Actualizada'})
	})
}

function deleteCurrency(req, res) {
	var currencyId = req.params.currencyId

	Currency.findById(currencyId, function (err, currency) {
		if(err) res.status(500).send({mensaje:'Moneda no existe'})

		currency.remove(function (err) {
			if (err) res.status(500).send({mensaje:'error al eliminar la Moneda'})

			res.status(200).send({status:'Moneda Eliminada'})
		})
	})
}



module.exports = {

	getCurrency,
	getCurriencies,
	saveCurrency,
	updateCurrency,
	deleteCurrency

}