'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('user', {
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

		await queryInterface.createTable('manufacturer', {
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

		await queryInterface.createTable('phone', {
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
			releaseDate: {
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

	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropAllTables();
	}
};