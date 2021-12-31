const Sequelize = require('sequelize');
const db = require('../config/database');

const Phone = db.define('phone', {
    name: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    release_date: {
        type: Sequelize.DATE
    }
})

module.exports = Phone;