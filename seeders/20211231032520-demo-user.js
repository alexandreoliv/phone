'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          id: 1,
          email: 'test@test.com',
          name: 'Alex',
          password: 1234,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          email: 'test2@test.com',
          name: 'Marie',
          password: 1234,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'manufacturer',
      [
        {
          id: 1,
          name: 'Samsung',
          location: 'South Korea',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: 'Apple',
          location: 'USA',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'phone',
      [
        {
          id: 1,
          name: 'Galaxy S9',
          manufacturer_id: 1,
          quantity: 50,
          release_date: new Date('2018-03-16T00:00'),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: 'iPhone X',
          manufacturer_id: 2,
          quantity: 30,
          release_date: new Date('2017-11-03T00:00'),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          name: 'Galaxy S11',
          manufacturer_id: 1,
          quantity: 70,
          release_date: new Date('2020-02-11T00:00'),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );


  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});

  }
};
