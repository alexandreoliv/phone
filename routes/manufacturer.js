const express = require('express');
const router = express.Router();
const Manufacturer = require('../models/Manufacturer');
const Phone = require('../models/Phone');
const loginCheck = require('../config/passport');

router.get('/', (req, res) =>
	Manufacturer.findAll()
	.then(manufacturers => {
		res.status(200).json({
			manufacturers
		});
	})
	.catch(err => console.log(err))
);

router.post('/create', loginCheck(), (req, res) => {
	const {
		name,
		location,
	} = req.body;

	if (!name) {
		res.status(400).json({
			message: 'Please provide name of manufacturer'
		});
		return;
	}

	Manufacturer.create({
			name,
			location
		})
		.then(() => res.status(200).json(`Manufacturer ${name} created`))
		.catch(err => console.log(err))
});

router.put('/:manufacturer_key', loginCheck(), (req, res) => {
	const {
		name,
		location
	} = req.body;
	const id = req.params.manufacturer_key;

	if (!name) {
		res.status(400).json({
			message: 'Please provide name of manufacturer'
		});
		return;
	}

	Manufacturer.update({
			name,
			location
		}, {
			where: {
				id: id
			}
		})
		.then(() => res.status(200).json(`Manufacturer ${name} updated`))
		.catch(err => console.log(err))
});

router.get('/:manufacturer_key', loginCheck(), (req, res) => {
	const id = req.params.manufacturer_key;

	Manufacturer.findOne({
			where: {
				id: id
			}
		})
		.then(manufacturer => {
			res.status(200).json({
				manufacturer
			});
		})
		.catch(err => console.log(err))
});

router.delete('/:manufacturer_key', loginCheck(), (req, res) => {
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
				.then(() => res.status(200).json('Manufacturer deleted'))
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
			res.status(200).json({
				phones
			});
		})
		.catch(err => console.log(err))
});

module.exports = router;