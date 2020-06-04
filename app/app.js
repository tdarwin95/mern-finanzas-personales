const express = require('express') //servidor
const bodyParser = require('body-parser') //tratar los datos que se encuentran en el cuerpo de las peticiones
const mongoose = require('mongoose') //base de datos
const morgan = require('morgan') //ver peticiones en el servidor
var path = require('path')

const app = express()

//configuracion--------


//Midleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//rutas API
//rutas usuario
const user = require ('./routes/user');
app.use('/api', user);

//rutas actividades
const activity = require ('./routes/activity');
app.use('/api', activity);

//Rutas categorias
const category = require ('./routes/category');
app.use('/api', category);

//Rutas monedas
const currency = require ('./routes/currency');
app.use('/api', currency);

//Rutas autenticacion usuario
const auth = require ('./routes/auth');
app.use('/api', auth);



//static files
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app;