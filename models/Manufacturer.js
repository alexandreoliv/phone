const Sequelize = require('sequelize');
const db = require('../config/database');

const Manufacturer = db.define('manufacturer', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	name: {
		type: Sequelize.STRING(100),
		allowNull: false,
		unique: true
	},
	location: {
		type: Sequelize.STRING(500)
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

module.exports = Manufacturer;