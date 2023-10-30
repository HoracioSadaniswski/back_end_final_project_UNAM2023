import jwt from 'jsonwebtoken';

//Middleware para la validación de los tokens recibidos
function tokenAuthentication(req, res, next) {
	const headerAuthorization = req.headers['authorization'];

	const tokenRecibido = headerAuthorization.split(' ')[1];

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
	req.nivelUsuario = payload.nivel;

	next();
};

export default tokenAuthentication;
