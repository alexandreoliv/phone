const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

const loginCheck = () => {
	return (req, res, next) => {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.status(500).json({
				errorMessage: 'User is not authenticated'
			});
		}
	}
}

passport.serializeUser((user, done) => {
	console.log('passport.serializeUser');
	done(null, user.email);
});

passport.deserializeUser((email, done) => {
	console.log('passport.deserializeUser');
	User.findOne({
			where: {
				email: email
			}
		})
		.then(user => {
			done(null, user);
		})
		.catch(err => console.log('err'))
});

passport.use(
	new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, (email, password, done) => {
		console.log('passport.use');
		User.findOne({
				where: {
					email: email
				}
			})
			.then(foundUser => {
				if (!foundUser) {
					return done(null, false, {
						message: 'Incorrect username'
					});
				}

				if (!bcrypt.compareSync(password, foundUser.password)) {
					return done(null, false, {
						message: 'Incorrect password'
					});
				}

				return done(null, foundUser);
			})
			.catch(err => console.log('err'))
	})
);

module.exports = loginCheck;