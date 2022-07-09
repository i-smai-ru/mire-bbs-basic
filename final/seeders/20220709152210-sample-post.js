'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        userId: 1,
        message: 'hello!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        message: 'hello!!!!!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        message: 'こんにちは',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        message: 'おはよう',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        message: 'こんばんは',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
