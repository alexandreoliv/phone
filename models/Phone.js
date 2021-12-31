const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

const db = require('../config/database');

const Phone = db.define('phone', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true
    },
    manufacturer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'manufacturer',
            key: 'id'
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    release_date: {
        type: Sequelize.DATE
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
});


module.exports = Phone;