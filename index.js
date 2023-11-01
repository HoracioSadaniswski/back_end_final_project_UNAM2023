import express from 'express';
import db from './db/connection.js';
import routerApi from './routes/routerApi.js';

import makeBody from './middlewares/makeBody.js';
import authentication from './middlewares/authentication.js';

const html = `
<h1>Bienvenido a la API</h1>
<p>Los comandos disponibles son:</p>
<ul>
    <li><strong>LOGIN</strong></li>
    <ul>
        <li>POST: /auth</li>
    </ul>
    <li><strong>USUARIOS</strong></li>
    <ul>
        <li>GET: /usuarios/</li>
        <li>GET: /usuarios/nivel/3</li>
        <li>GET: /usuarios/16/ (Authorization required)</li>
        <li>POST: /usuarios/ (Create User)</li>
        <li>PATCH: /usuarios/16 (Update User)</li>
        <li>DELETE: /usuarios/15 (Delete User)</li>
    </ul>
    <li><strong>PRODUCTOS</strong></li>
    <ul>
        <li>GET: /productos/</li>
        <li>GET: /productos/34/</li>
        <li>GET: /productos/total-stock (Authorization required)</li>
        <li>POST: /productos (Create Product, Authorization required)</li>
        <li>PATCH: /productos/34 (Update Product, Authorization required)</li>
        <li>PATCH: /productos/stock/34 (Update Product Stock, Authorization required)</li>
        <li>DELETE: /productos/33 (Delete Product, Authorization required)</li>
    </ul>
    <li><strong>CATEGORIAS</strong></li>
    <ul>
        <li>GET: /categorias/</li>
        <li>GET: /categorias/13/</li>
        <li>POST: /categorias/ (Create Category, Authorization required)</li>
        <li>PATCH: /categorias/13 (Update Category, Authorization required)</li>
        <li>DELETE: /categorias/11 (Delete Category, Authorization required)</li>
    </ul>
    <li><strong>CARRITO</strong></li>
    <ul>
        <li>POST: /carrito/9 (Add Product to Cart, Authorization required)</li>
        <li>GET: /carrito/9 (View Cart, Authorization required)</li>
        <li>DELETE: /carrito/9/31 (Remove Product from Cart, Authorization required)</li>
    </ul>
    <li><strong>VENTAS</strong></li>
    <ul>
        <li>GET: /ventas/all (List All Sales, Authorization required)</li>
        <li>POST: /ventas/9 (Create Sale, Authorization required)</li>
        <li>GET: /ventas/9 (View Sales Details, Authorization required)</li>
        <li>DELETE: /ventas/9/1 (Delete Sale, Authorization required)</li>
    </ul>
</ul>
`;

const app = express();

const port = 3000;

app.get('/', (req, res) => {
	res.status(200).send(html);
});

app.use(makeBody);

routerApi(app);

app.post('/auth', authentication);

app.use((req, res) => {
	res.status(404).send('<h1>404</h1>');
});

try {
	await db.authenticate();
	console.log('Conexión exitosa con db');
} catch (error) {
	console.log('Error en la conexión con db');
};

app.listen(port, () => {
	console.log('Servidor corriendo en http://localhost:' + port);
});


