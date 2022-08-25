'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field:"user_id",
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: "cascade",
        onUpdate:"restrict"
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isDone: {
        field:"is_done",
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      deadLine: {
        field:"dead_line",
        type: Sequelize.DATE
      },
      createdAt: {
        field:"created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field:"updated_at",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};