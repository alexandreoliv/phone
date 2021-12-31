const {
	Sequelize,
	DataTypes,
	Model
} = require('sequelize');

const db = require('../config/database');

const User = db.define('user', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	email: {
		type: Sequelize.STRING(50),
		allowNull: false,
		unique: true
	},
	name: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	password: {
		type: Sequelize.STRING(60),
		allowNull: false
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

module.exports = User;