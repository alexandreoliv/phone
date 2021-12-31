const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Manufacturer = require('../models/Manufacturer');
const Phone = require('../models/Phone');

router.get('/', (req, res) =>
	Manufacturer.findAll()
	.then(manufacturers => {
		console.log(manufacturers);
		res.json({
			manufacturers
		});
	})
	.catch(err => console.log(err))
);

router.post('/create', (req, res) => {
	const {
		id,
		name,
		location,
	} = req.body;
	Manufacturer.create({
			id,
			name,
			location
		})
		.then(() => res.redirect('/'))
		.catch(err => console.log(err))
});

router.put('/:manufacturer_key', (req, res) => {
	const {
		name,
		location
	} = req.body;
	const id = req.params.manufacturer_key;
	Manufacturer.update({
			name,
			location
		}, {
			where: {
				id: id
			}
		})
		.then(() => res.redirect('/'))
		.catch(err => console.log(err))
});

router.get('/:manufacturer_key', (req, res) => {
	const id = req.params.manufacturer_key;
	Manufacturer.findOne({
			where: {
				id: id
			}
		})
		.then(manufacturer => {
			console.log(manufacturer);
			res.json({
				manufacturer
			});
		})
		.catch(err => console.log(err))
});

router.delete('/:manufacturer_key', (req, res) => {
	const id = req.params.manufacturer_key;
	Phone.destroy({
			where: {
				manufacturer_id: id
			}
		})
		.then(() => {
			Manufacturer.destroy({
					where: {
						id: id
					}
				})
				.then(() => res.redirect('/'))
				.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
});

router.get('/:manufacturer_key/phones', (req, res) => {
	const id = req.params.manufacturer_key;
	Phone.findAll({
			where: {
				manufacturer_id: id
			}
		})
		.then(phones => {
			console.log(phones);
			res.json({
				phones
			});
		})
		.catch(err => console.log(err))
});

module.exports = router;