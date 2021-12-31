'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'user',
			[{
					email: 'test@test.com',
					name: 'Alex',
					password: 1234,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					email: 'test2@test.com',
					name: 'Marie',
					password: 1234,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			], {}
		);

		await queryInterface.bulkInsert(
			'manufacturer',
			[{
					name: 'Samsung',
					location: 'South Korea',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Apple',
					location: 'USA',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			], {}
		);

		await queryInterface.bulkInsert(
			'phone',
			[{
					name: 'Galaxy S9',
					manufacturer_id: 1,
					quantity: 50,
					releaseDate: new Date('2018-03-16T00:00'),
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'iPhone X',
					manufacturer_id: 2,
					quantity: 30,
					releaseDate: new Date('2017-11-03T00:00'),
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Galaxy S11',
					manufacturer_id: 1,
					quantity: 70,
					releaseDate: new Date('2020-02-11T00:00'),
					createdAt: new Date(),
					updatedAt: new Date()
				}
			], {}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('user', null, {});

	}
};