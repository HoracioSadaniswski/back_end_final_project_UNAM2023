import express from 'express';
import db from './db/connection.js';
import routerApi from './routes/routerApi.js';

const html = '<h1>Bienvenido a la API</h1><p>Los comandos disponibles son:</p><ul><li>GET: /productos/</li><li>GET: /productos/id</li><li>POST: /productos/</li><li>DELETE: /productos/id</li><li>PUT: /productos/id</li><li>PATCH: /productos/id</li><li>GET: /usuarios/</li><li>GET: /usuarios/id</li><li>POST: /usuarios/</li><li>DELETE: /usuarios/id</li><li>PUT: /usuarios/id</li><li>PATCH: /usuarios/id</li></ul>';

const app = express();

const port = 3000;

/* app.use(express.json()); */

app.get('/', (req, res) => {
	res.status(200).send(html);
});

routerApi(app);

try {
	await db.authenticate();
	console.log('Conexión exitosa con db');
} catch (error) {
	console.log('Error en la conexión con db');
};

app.use((req, res) => {
	res.status(404).send('<h1>404</h1>');
});

app.listen(port, () => {
	console.log('Servidor corriendo en http://localhost:' + port);
});


