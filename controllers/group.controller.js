const createError = require("http-errors");
const _ = require("lodash");
const { Group, User } = require("../models");

module.exports.createGroupByUser = async (req, res, next) => {
  try {
    //забрать тело запроса
    const { body } = req;
    //получить юзера
    const user = await User.findByPk(body.userId);
    if (!user) {
      const error = createError(404, "User not found");
      next(error);
    }
    const values = _.pick(body, ["name", "imagePath", "description","theme"]);
    //создать группу ->groupId
    const group = await Group.create({ ...values });

    //связать юзера и группу с помощью магии
    await group.addUser(user);
    
    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};
