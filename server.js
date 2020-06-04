const Database = require('./app/config/database');
const Config = require('./app/config/config');
const app = require('./app/app');

Database.connect();

app.listen(Config.PORT, function (error) {
	if (error) return console.log(error);
	console.log('Servidor corriendo el el puerto:', Config.PORT);
})