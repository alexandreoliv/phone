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
	Phone.create({
			name,
			quantity,
			manufacturer_id,
			releaseDate
		})
		.then(() => res.json(`Phone ${name} created`))
		.catch(err => console.log(err))
});

router.put('/:phone_key', loginCheck(), (req, res) => {
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
		.then(() => res.json(`Phone ${name} updated`))
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
			res.json({
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
		.then(() => res.json(`Phone deleted`))
		.catch(err => console.log(err))
});

module.exports = router;