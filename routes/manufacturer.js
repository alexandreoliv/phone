const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Manufacturer = require('../models/Manufacturer');

router.get('/', (req, res) =>
	Manufacturer.findAll()
	.then(manufacturers => {
		console.log(manufacturers);
		res.sendStatus(200);
	})
	.catch(err => console.log(err)));

module.exports = router;