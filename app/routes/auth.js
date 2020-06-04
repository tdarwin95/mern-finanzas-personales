const express = require('express')
const AuthController = require('../controllers/AuthController');
const Router = express.Router();

//mostrar todo
Router.post('/register', AuthController.registerUser)
 	  .post('/login', AuthController.loginUser)
 	  .get('/profile', AuthController.profileUser)

module.exports = Router;