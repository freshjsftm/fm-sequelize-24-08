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
    const values = _.pick(body, ["name", "imagePath", "description", "theme"]);
    const group = await Group.create({ ...values });
    await group.addUser(user);
    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroupsByUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const userWithGroups = await User.findByPk(userId, {
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Group,
        through: {
          attributes: [],
        },
      },
    });
    if (!userWithGroups) {
      const error = createError(404, "User not found");
      next(error);
    }
    res.status(200).send({ data: userWithGroups });
  } catch (error) {
    next(error);
  }
};

module.exports.createImageToGroup = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { groupId },
    } = req;
    const [row, [group]] = await Group.update(
      { imagePath: filename },
      {
        where: { id: groupId },
        returning: true,
      }
    );
    if (row === 0) {
      const error = createError(404, "Group not found");
      next(error);
      return;
    }
    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToGroup = async (req, res, next) => {
  try {
    const {
      body: { userId },
      params: { groupId },
    } = req;
    const group = await Group.findByPk(groupId);
    if (!group) {
      next(createError(404, "group not found"));
    }
    const user = await User.findByPk(userId);
    if (!user) {
      next(createError(404, "user not found"));
    }
    await group.addUser(user)
    const groupWithUsers = await Group.findByPk(groupId,{
      include: [{
        model: User,
        through: { attributes: [] },
        attributes: {
          exclude: ["password"],
        }
      }]
    })
    res.status(201).send({data: groupWithUsers})
  } catch (error) {
    next(error);
  }
}
