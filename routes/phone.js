const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Phone = require('../models/Phone');

router.post('/create/:manufacturer_key', (req, res) => {
	const {
		id,
		name,
		quantity,
		releaseDate
	} = req.body;
	const manufacturer_id = req.params.manufacturer_key;
	Phone.create({
			id,
			name,
			quantity,
			manufacturer_id,
			releaseDate
		})
		.then(() => res.redirect('/'))
		.catch(err => console.log(err))
});

router.put('/:phone_key', (req, res) => {
	const {
		name,
		quantity,
		releaseDate
	} = req.body;
	const id = req.params.phone_key;
	Phone.update({
			name,
			quantity,
			releaseDate
		}, {
			where: {
				id: id
			}
		})
		.then(() => res.redirect('/'))
		.catch(err => console.log(err))
});

router.get('/:phone_key', (req, res) => {
	const id = req.params.phone_key;
	Phone.findOne({
			where: {
				id: id
			}
		})
		.then(phone => {
			console.log(phone);
			res.sendStatus(200);
		})
		.catch(err => console.log(err))
});

router.delete('/:phone_key', (req, res) => {
	const id = req.params.phone_key;
	Phone.destroy({
			where: {
				id: id
			}
		})
		.then(() => res.redirect('/'))
		.catch(err => console.log(err))
});

module.exports = router;