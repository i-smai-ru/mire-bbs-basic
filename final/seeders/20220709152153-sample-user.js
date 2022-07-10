'use strict';
const bcrypt = require("bcrypt");

async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  const passwprdHash = await bcrypt.hash(password, salt);

  return passwprdHash;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'nklabo1',
        pass: await hash('nklabo1'),
        mail: 'nklabo1@nklabo.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'nklabo2',
        pass: await hash('nklabo2'),
        mail: 'nklabo2@nklabo.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'nklabo3',
        pass: await hash('nklabo3'),
        mail: 'nklabo3@nklabo.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'nklabo4',
        pass: await hash('nklabo4'),
        mail: 'nklabo4@nklabo.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
