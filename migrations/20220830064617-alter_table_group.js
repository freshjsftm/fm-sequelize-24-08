"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("groups", "theme", Sequelize.STRING, {
      after: "name",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("groups", "theme");
  },
};
