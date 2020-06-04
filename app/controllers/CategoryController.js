const Category = require ('../models/Category')

function getCategory(req, res) {
	var categoryId = req.params.categoryId

	Category.findById(categoryId, function (err, category) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!category) return res.status(404).send({mensaje: 'No existen registros en la base de datos'})

		res.status(200).send({category:category})
	})
}

function getCategories(req, res) {

	var userId = req.params.userId
	
	Category.find({userId:userId}, function (err, categories) {
		if(err) return res.status(500).send({mensaje: 'Error al realizar la peticion'})
		if(!categories) return res.status(404).send({mensaje: 'No existen registros en la base de datos'})

		res.status(200).send({categories:categories})
	})
}

function saveCategory(req, res) {
	//imprimir el cuerpo del mensaje en consola
	console.log(req.body)

	//creamos un esquema de tipo Articulo
	var category = new Category()

	//guardamos datos del body del mensaje en el esquema
	category.name = req.body.name
	//manejar dependiendo el tipo de usuario
	category.global = false
	category.userId = req.body.userId

	//guardamos en la base de datos
	category.save(function(err, categoryStored) {
		if(err) res.status(500).send({mensaje:'Error al insertar categoria'})

		res.status(200).send({status: 'Categoria Guardada'})
	})
}

function updateCategory(req, res) {
	var categoryId = req.params.categoryId
	var update = req.body

	Category.findByIdAndUpdate(categoryId, update, function (err, categoryUpdated) {
		if (err) res.status(500).send({mensaje:'Error al actualizar la categoria'})

		res.status(200).send({status:'Categoria Actualizada'})
	})
}

function deleteCategory(req, res) {
	var categoryId = req.params.categoryId

	Category.findById(categoryId, function (err, category) {
		if(err) res.status(500).send({mensaje:'categoria no existe'})

		category.remove(function (err) {
			if (err) res.status(500).send({mensaje:'error al eliminar la categoria'})

			res.status(200).send({status:'Categoria Eliminada'})
		})
	})
}



module.exports = {

	getCategory,
	getCategories,
	saveCategory,
	updateCategory,
	deleteCategory

}