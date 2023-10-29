import express from 'express';
import db from './db/connection.js';
import routerApi from './routes/routerApi.js';
import jwt from 'jsonwebtoken';

const html = '<h1>Bienvenido a la API</h1><p>Los comandos disponibles son:</p><ul><li>GET: /productos/</li><li>GET: /productos/id</li><li>POST: /productos/</li><li>DELETE: /productos/id</li><li>PUT: /productos/id</li><li>PATCH: /productos/id</li><li>GET: /usuarios/</li><li>GET: /usuarios/id</li><li>POST: /usuarios/</li><li>DELETE: /usuarios/id</li><li>PUT: /usuarios/id</li><li>PATCH: /usuarios/id</li></ul>';

const app = express();

const port = 3000;

//Middleware para la validación de los tokens recibidos
function autenticacionDeToken(req, res, next) {
	const headerAuthorization = req.headers['authorization'];

	const tokenRecibido = headerAuthorization.split(" ")[1];

	if (tokenRecibido == null){
			return res.status(401).json({message: 'Token inválido'});
	}

	let payload = null;

	try {
			// se sustraen los datos del payload del token
			payload = jwt.verify(tokenRecibido, process.env.SECRET_KEY);
	} catch (error) {
			return res.status(401).json({message: 'Token inválido'});
	};

	if (Date.now() > payload.exp) {
			return res.status(401).json({message: 'El token ha caducado.'});
	}

	//superadas las validaciones
	req.user = payload.sub;

	next();
};


//Middleware construye el body en req de tipo post y patch
app.use((req, res, next) => {
	if ((req.method !== 'POST') && (req.method!== 'PATCH')) { return next()};

	if (req.headers['content-type'] !== 'application/json') { return next()};

	let bodyTemp = '';

	req.on('data', (chunk) => {
			bodyTemp += chunk.toString();
	});

	req.on('end', () => {
			const data = JSON.parse(bodyTemp);
			req.body = data;

			next();
	});
});

app.get('/', (req, res) => {
	res.status(200).send(html)
});

//endpoint de autenticación de usuario
app.post('/auth', async (req, res) => {

	//captura de datos de logueo
	const usuarioABuscar = req.body.usuario;
	const passwordRecibida = req.body.password;

	let usuarioEncontrado = '';

	//comprobación del usuario
	try {
			usuarioEncontrado = await Usuario.findAll({where:{usuario:usuarioABuscar}});

			if (usuarioEncontrado == '') { return res.status(400).json({message: 'Usuario no encontrado'}) };
	} catch (error) {
			return res.status(400).json({message: 'Usuario no encontrado'});
	};

	//comprobación del password
	if (usuarioEncontrado[0].password !== passwordRecibida){
			return res.status(400).json({message: 'Password incorrecto'});
	}

	// generarión del token
	const sub = usuarioEncontrado[0].id;
	const usuario = usuarioEncontrado[0].usuario;
	const nivel = usuarioEncontrado[0].nivel_us;

	//firma y construccion del token
	const token = jwt.sign({
			sub,
			usuario,
			nivel,
			exp: Date.now() + (60 * 1000)
	}, process.env.SECRET_KEY);

	res.status(200).json({ accessToken: token });

});

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


