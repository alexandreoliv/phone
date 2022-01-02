const express = require('express');
const router = express.Router();
const Phone = require('../models/Phone');
const loginCheck = require('../config/passport');

router.post('/create/:manufacturer_key', loginCheck(), (req, res) => {
	const {
		name,
		quantity,
		releaseDate
	} = req.body;
	const manufacturer_id = req.params.manufacturer_key;

	if (!name || !quantity) {
		res.status(400).json({
			message: 'Please provide name and quantity'
		});
		return;
	}

	Phone.create({
			name,
			quantity,
			manufacturer_id,
			releaseDate
		})
		.then(() => res.status(200).json(`Phone ${name} created`))
		.catch(err => console.log(err))
});

router.put('/:phone_key', loginCheck(), (req, res) => {
	const {
		name,
		quantity,
		releaseDate
	} = req.body;
	const id = req.params.phone_key;

	if (!name || !quantity) {
		res.status(400).json({
			message: 'Please provide name and quantity'
		});
		return;
	}
	Phone.update({
			name,
			quantity,
			releaseDate
		}, {
			where: {
				id: id
			}
		})
		.then(() => res.status(200).json(`Phone ${name} updated`))
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
			res.status(200).json({
				phone
			});
		})
		.catch(err => console.log(err))
});

router.delete('/:phone_key', loginCheck(), (req, res) => {
	const id = req.params.phone_key;

	Phone.destroy({
			where: {
				id: id
			}
		})
		.then(() => res.status(200).json(`Phone deleted`))
		.catch(err => console.log(err))
});

module.exports = router;