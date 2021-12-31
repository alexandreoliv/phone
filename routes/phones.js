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
    .catch(err => console.log(err)));

module.exports = router;