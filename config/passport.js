const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Middleware to check if the user is logged in
const loginCheck = () => {
	return (req, res, next) => {
		// is there a logged in user - using passport you can use req.isAuthenticated()
		console.log('checking if authenticated');
		if (req.isAuthenticated()) {
			console.log('yes, authenticated');
			// proceed as intended
			next();
		}
		else {
			console.log('no, not authenticated');
			// there is no user logged in
			// we redirect to /login
			res.status(500).json({
				errorMessage: 'User is not authenticated.'
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
		console.log('deserializing user: ' + user.email);
		done(null, user);
	});
});

passport.use(
	new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, (email, password, done) => {
		// console.log(email, password);
		console.log('passport.use');
		User.findOne({
				where: {
					email: email
				}
			})
			.then(foundUser => {
				// console.log("email addres: " + foundUser.email);
				if (!foundUser) {
					return done(null, false, {
						message: 'Incorrect username.'
					});
				}

				if (!bcrypt.compareSync(password, foundUser.password)) {
					return done(null, false, {
						message: 'Incorrect password.'
					});
				}

				console.log('returning foundUser: ', foundUser);
				return done(null, foundUser);
			})
			.catch(err => console.log("err"))
	})
);

module.exports = loginCheck;