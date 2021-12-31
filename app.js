const express = require('express');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');

// Database
const db = require('./config/database');

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const app = express();

app.get('/', (req, res) => res.send('INDEX'));

app.use(bodyParser.json());
// App routes
app.use('/phone', require('./routes/phones'));
app.use('/user', require('./routes/user'));
app.use('/manufacturer', require('./routes/manufacturer'));

const PORT = process.env.PG_PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${process.env.PG_PORT}`));