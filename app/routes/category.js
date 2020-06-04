const express = require('express')
const categoryController = require('../controllers/categoryController');
const Router = express.Router();


//mostrar todo
Router.get('/categories/:userId', categoryController.getCategories)
 	  .get('/category/:categoryId', categoryController.getCategory)
 	  .post('/category', categoryController.saveCategory)
 	  .put('/category/:categoryId', categoryController.updateCategory)
 	  .delete('/category/:categoryId', categoryController.deleteCategory);

module.exports = Router;