const router = require('express').Router();
const Users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');
const { checkInput } = require('../users/users-checks.js');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

router.post('/register', async (req, res) => {
	const userCredentials = req.body;

	if (checkInput(userCredentials)) {
		const hash = bcrypt.hashSync(userCredentials.password, 8);
		userCredentials.password = hash;

		try {
			const saved = await Users.add(userCredentials);
			res.status(201).json(saved);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	} else {
	}
});

router.post('/login', async (req, res) => {
	let { name, password } = req.body;
	if (checkInput(req.body)) {
		try {
			const user = await Users.findBy({ name }).first();

			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);

				res.status(200).json({
					message: 'Welcome to our API',
					token,
				});
			} else {
				res.status(401).json({ message: 'Invalid credentials' });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	} else {
		res.status(400).json({
			message:
				'please provide username and password and the password shoud be alphanumeric',
		});
	}
});

function generateToken(user) {
	const payload = {
		userId: user.id,
		userName: user.username,
		userDepartment: user.department,
	};

	const secret = secrets.jwtSecret;

	const options = {
		expiresIn: '2h',
	};

	return jwt.sign(payload, secret, options);
}
module.exports = router;
