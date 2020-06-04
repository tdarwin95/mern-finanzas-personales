const express = require('express')
const CurrencyController = require('../controllers/CurrencyController');
const Router = express.Router();


//mostrar todo
Router.get('/currencies', CurrencyController.getCurriencies)
 	  .get('/currency/:currencyId', CurrencyController.getCurrency)
 	  .post('/currency', CurrencyController.saveCurrency)
 	  .put('/currency/:currencyId', CurrencyController.updateCurrency)
 	  .delete('/currency/:currencyId', CurrencyController.deleteCurrency);

module.exports = Router;