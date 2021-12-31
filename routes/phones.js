const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Phone = require('../models/Phone');

router.get('/', (req, res) =>
    Phone.findAll()
    .then(phones => {
        console.log(phones);
        res.sendStatus(200);
    })
    .catch(err => console.log(err))
);

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

/*
    - POST `/phone/create/{manufacturer_key}`; body: `{}`; authorisation: `true`
    - Should create new phone object that is assigned to designated manufacturer
- PUT `/phone/{phone_key}`; body: `{name, quantity, releaseDate}`; authorisation: `true`
    - Should update data about specific phone model;
- GET `/manufacturer/{manufacturer_key}/phones`; authorisation: `false`
    - Should return the array of all phones that are connected to specified manufacturer;
- GET `/phone/{phone_key}`; authorisation: `false`
    - Should return only data about specified phone;
- DELETE `/phone/{phone_key}`; authorisation: `true`
    - Should remove phone;
*/

module.exports = router;