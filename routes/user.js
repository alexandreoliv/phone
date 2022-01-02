const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

router.post('/register', (req, res, next) => {
	const {
		email,
		name,
		password
	} = req.body;

	if (!name || !password) {
		res.status(400).json({
			message: 'Please provide username and password'
		});
		return;
	}

	// Make sure passwords are strong
	const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	if (!regex.test(password)) {
		res.status(500).json({
			errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.'
		});
		return;
	}

	bcrypt
		.genSalt(SALT_ROUNDS)
		.then(salt => bcrypt.hash(password, salt))
		.then(hashedPassword => {
			return User.create({
				email,
				name,
				password: hashedPassword
			});
		})
		.then(userFromDB => {
			console.log('Newly created user is: ', userFromDB);
			res.status(200).json(userFromDB);
		})
		.catch(error => {
			res.status(500).json({
				errorMessage: 'Username and email need to be unique. Either username or email is already used.'
			});
			next(error);
		});
});

router.post('/login', (req, res, next) => {
	console.log('router.post /login');
	passport.authenticate('local', (err, user, failureDetails) => {
		console.log('passport.authenticate');
		if (err) {
			res.status(500).json({
				message: 'Something went wrong authenticating user'
			});
			return;
		}

		if (!user) {
			// "failureDetails" contains the error messages
			// from our logic in "LocalStrategy" { message: '...' }.
			res.status(401).json(failureDetails);
			return;
		}

		// save user in session
		req.login(user, err => {
			if (err) {
				res.status(500).json({
					message: 'Session save went bad.'
				});
				return;
			}

			// we are now logged in (that's why we can also send req.user)
			res.status(200).json(user);
		});
	})(req, res, next);
});

router.post('/logout', (req, res, next) => {
	// req.logout() is defined by passport
	console.log('router.post /logout');
	req.logout();
	res.status(200).json({
		message: 'Log out success!'
	});
});

router.get('/loggedin', (req, res, next) => {
	// req.isAuthenticated() is defined by passport
	console.log('router.post /loggedin');
	if (req.isAuthenticated()) {
		res.status(200).json(req.user);
		return;
	}
	res.status(403).json({
		message: 'Unauthorized'
	});
});

module.exports = router;