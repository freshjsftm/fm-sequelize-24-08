const createError = require("http-errors");
const _ = require("lodash");
const { Group, User } = require("../models");

module.exports.createGroupByUser = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findByPk(body.userId);
    if (!user) {
      const error = createError(404, "User not found");
      next(error);
    }
    const values = _.pick(body, ["name", "imagePath", "description","theme"]);
    const group = await Group.create({ ...values });
    await group.addUser(user);
    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroupsByUser = async (req, res, next) => {
  try {
    const {params:{userId}} = req;
    const userWithGroups = await User.findByPk(userId, {
      include:{
        model:Group,
        through:{
          attributes: []
        }
      }
    });
    if (!userWithGroups) {
      const error = createError(404, "User not found");
      next(error);
    }
    res.status(200).send({data:userWithGroups})
  } catch (error) {
    next(error);
  }
};

module.exports.createImageToGroup = async (req, res, next) => {
  try {
    const {file:{filename}, params:{groupId}} = req;
    const [row,[group]] = await Group.update(
      {imagePath:filename},
      {
        where:{id:groupId},
        returning: true
      }
    )
    if (row===0) {
      const error = createError(404, "Group not found");
      next(error);
      return;
    }
    res.status(201).send({data: group})
  } catch (error) {
    next(error);
  }
};