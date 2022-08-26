"use strict";
const { User } = require("../models");
const _ = require("lodash");

const generateTask = (id, key) => ({
  user_id: id,
  body: `task content ${key} from userId=${id}`,
  is_done: false,
  dead_line: new Date(),
  created_at: new Date(2021, 0, id),
  updated_at: new Date(2022, 0, id),
});

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll();
    const tasks = users
      .map((u) => {
        return new Array(_.random(5, 9, false))
          .fill(null)
          .map((t, i) => generateTask(u.id, i + 1));
      })
      .flat(2);
    await queryInterface.bulkInsert("tasks", tasks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
