const express = require('express')
const UserController = require('../controllers/UserController');
const Router = express.Router();


//mostrar todo
Router.get('/users', UserController.getUsers)
 	  .get('/user/:userId', UserController.getUser)
 	  .post('/user', UserController.saveUser)
 	  .put('/user/:userId', UserController.updateUser)
 	  .delete('/user/:userId', UserController.deleteUser)

module.exports = Router;