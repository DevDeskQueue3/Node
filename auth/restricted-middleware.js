const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
	const tokenHeader = req.headers.authorization;
	const parts = tokenHeader.split(' ');
	const token = parts[1];

	if (token) {
		jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: 'You shall not pass!' });
			} else {
				res.decodedJwt = decodedToken;
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'You shall not pass!' });
	}
};
