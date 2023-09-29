import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const datos = require('./datos.json');

import express from 'express';
const html = '<h1>Bienvenido a la API</h1><p>Los comandos disponibles son:</p><ul><li>GET: /productos/</li><li>GET: /productos/id</li>    <li>POST: /productos/</li>    <li>DELETE: /productos/id</li>    <li>PUT: /productos/id</li>    <li>PATCH: /productos/id</li>    <li>GET: /usuarios/</li>    <li>GET: /usuarios/id</li>    <li>POST: /usuarios/</li>    <li>DELETE: /usuarios/id</li>    <li>PUT: /usuarios/id</li>    <li>PATCH: /usuarios/id</li></ul>';

const app = express();

const exposedPort = 1234;

app.get('/', (req, res) => {
	res.status(200).send(html);
});

//Productos
app.get('/productos/', (req, res) =>{
	try {
		let allProducts = datos.productos;

		res.status(200).json(allProducts);

	} catch (error) {
		res.status(204).json({'message': error});
	}
});

app.get('/productos/:id', (req, res) => {
	try {
		let productoId = parseInt(req.params.id);
		let productoEncontrado = datos.productos.find((producto) => producto.id === productoId);

		res.status(200).json(productoEncontrado);

	} catch (error) {
		res.status(204).json({'message': error});
	}
});

app.post('/productos', (req, res) => {
	try {
		let bodyTemp = '';

		req.on('data', (chunk) => {
			bodyTemp += chunk.toString();
		});

		req.on('end', () => {
			const data = JSON.parse(bodyTemp);
			req.body = data;
			datos.productos.push(req.body);
		});

		res.status(201).json({'message': 'success'});

	} catch (error) {
		res.status(204).json({'message': 'error'});
	}
});

app.patch('/productos/:id', (req, res) => {
	let idProductoAEditar = parseInt(req.params.id);
	let productoAActualizar = datos.productos.find((producto) => producto.id === idProductoAEditar);

	if (!productoAActualizar) {
		res.status(204).json({'message':'Producto no encontrado'});
	}

	let bodyTemp = '';

	req.on('data', (chunk) => {
		bodyTemp += chunk.toString();
	});

	req.on('end', () => {
		const data = JSON.parse(bodyTemp);
		req.body = data;

		if(data.nombre){
			productoAActualizar.nombre = data.nombre;
		}

		if (data.tipo){
			productoAActualizar.tipo = data.tipo;
		}

		if (data.precio){
			productoAActualizar.precio = data.precio;
		}

		res.status(200).send('Producto actualizado');
	});
});

app.delete('/productos/:id', (req, res) => {
	let idProductoABorrar = parseInt(req.params.id);
	let productoABorrar = datos.productos.find((producto) => producto.id === idProductoABorrar);

	if (!productoABorrar){
		res.status(204).json({'message':'Producto no encontrado'});
	}

	let indiceProductoABorrar = datos.productos.indexOf(productoABorrar);
	try {
		datos.productos.splice(indiceProductoABorrar, 1);
		res.status(200).json({'message': 'success'});

	} catch (error) {
		res.status(204).json({'message': 'error'});
	}
});

//Usuarios
// 1 listado completo de usuarios
app.get('/usuarios/', (req, res) => {
	try {
		let allUsers = datos.usuarios;

		res.status(200).json(allUsers);
	} catch (error) {
		res.status(500).json({ 'message': 'Error interno del servidor' });
	}
});

// 2 Datos de un usuario consignado por su ID
app.get('/usuarios/:id', (req, res) => {
	try {
		const userId = parseInt(req.params.id);

		const usuarioEncontrado = datos.usuarios.find((usuario) => usuario.id === userId);

		if (!usuarioEncontrado) {
			res.status(404).json({ 'message': 'Usuario no encontrado' });
		} else {
			res.status(200).json(usuarioEncontrado);
		}
	} catch (error) {
		res.status(500).json({ 'message': 'Error interno del servidor' });
	}
});

// 3 guardar un nuevo usuario
app.post('/usuarios', (req, res) => {
	try {
		let bodyTemp = '';

		req.on('data', (chunk) => {
			bodyTemp += chunk.toString();
		});

		req.on('end', () => {
			const data = JSON.parse(bodyTemp);
			req.body = data;
			datos.usuarios.push(req.body);
		});

		res.status(201).json({'message': 'Usuario guardado exitosamente'});

	} catch (error) {
		res.status(204).json({'message': 'error'});
	}
});


// 4 modificar atributo de un usuario especifico
app.patch('/usuarios/:id', (req, res) => {
	let idUsuarioAActualizar = parseInt(req.params.id);
	let usuarioAActualizar = datos.usuarios.find((usuario) => usuario.id === idUsuarioAActualizar);

	if (!usuarioAActualizar) {
		res.status(404).json({ 'message': 'Usuario no encontrado' });
	} else {
		let bodyTemp = '';

		req.on('data', (chunk) => {
			bodyTemp += chunk.toString();
		});

		req.on('end', () => {
			const data = JSON.parse(bodyTemp);

			for (const atributo in data) {
				if (Object.hasOwnProperty.call(data, atributo)) {
					usuarioAActualizar[atributo] = data[atributo];
				}
			}

			res.status(200).json({ 'message': 'Usuario actualizado exitosamente', 'usuario': usuarioAActualizar });
		});
	}
});

// Borrar un Usuario especifico
app.delete('/usuarios/:id', (req, res) => {
	let idUsuarioABorrar = parseInt(req.params.id);
	let usuarioABorrar = datos.usuarios.find((usuario) => usuario.id === idUsuarioABorrar);

	if (!usuarioABorrar){
		res.status(204).json({'message':'Usuario no encontrado'});
	}

	let indiceUsuarioABorrar = datos.usuarios.indexOf(usuarioABorrar);
	try {
		datos.usuarios.splice(indiceUsuarioABorrar, 1);
		res.status(200).json({'message': 'El borrado se ha realizado exitosamente', 'Usuario Borrado': usuarioABorrar});

	} catch (error) {
		res.status(204).json({'message': 'El borrado no pudo realizarse'});
	}
});

app.use((req, res) => {
	res.status(404).send('<h1>404</h1>');
});

app.listen( exposedPort, () => {
	console.log('Servidor escuchando en http://localhost:' + exposedPort);
});

