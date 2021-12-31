// Dependencies
const express = require('express');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();

// Database
const db = require('./config/database');

// Test DB
db.authenticate()
	.then(() => console.log('Database connected...'))
	.catch(err => console.log('Error: ' + err))

// Session configuration
const session = require('express-session');
require('./config/passport');
// const MongoStore = require('connect-mongo');
// const DB_URL = process.env.MONGODB_URI;
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		// for how long is a user automatically logged in 
		cookie: {
			maxAge: 1000 * 60 * 60 * 24
		},
		saveUninitialized: false,
		resave: true,
	})
)

// Passport config
const User = require("./models/User");
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// App routes
app.get('/', (req, res) => res.send('INDEX'));
app.use(bodyParser.json());
app.use('/phone', require('./routes/phone'));
app.use('/user', require('./routes/user'));
app.use('/manufacturer', require('./routes/manufacturer'));

// Initialise server
const PORT = process.env.PG_PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${process.env.PG_PORT}`));