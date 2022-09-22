'use strict';
const _ = require('lodash');

const generateUser = key => ({
  first_name: `Elon${key}`,
  last_name: `Musk${key}`,
  email: `Elon${key}@gmail.com`,
  password_hash: 'hashPassword',
  birthday: new Date(1970, key, key),
  is_male: _.random(0, 10, false) > 5,
  created_at: new Date(2020, 0, key),
  updated_at: new Date(2021, 0, key),
});

const generateUsers = (amount = 50) => {
  return new Array(amount > 200 ? 200 : amount)
    .fill(null)
    .map((u, i) => generateUser(i + 1));
};

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', generateUsers(100), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
