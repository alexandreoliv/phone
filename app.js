const express = require('express');
const path = require('path');
require('dotenv').config();

// Databse
const db = require('./config/database');

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const app = express();

app.get('/', (req, res) => res.send('INDEX'));

// Phone routes
app.use('/phone', require('./routes/phones'));

const PORT = process.env.PG_PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${process.env.PG_PORT}`));