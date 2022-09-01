const createError = require("http-errors");
const { Op } = require("sequelize");
const { User } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    if(!createdUser){
      const error = createError(400, "Try again!")
      next(error)
    }
    const user = createdUser.get();
    user.password = undefined;
    res.status(201).send({ data: [user] });
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { userInstance } = req;
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { pagination } = req;
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      ...pagination,
    });
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body,
    } = req;
    const [row, [updatedUser]] = await User.update(body, {
      where: { userId },
      returning: true,
    });
    updatedUser.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    //const userInstance = await User.findByPk(id);
    const updatedUser = await userInstance.update(body, {
      returning: true,
    });
    updatedUser.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const { userInstance } = req;
    //const userInstance = await User.findByPk(id);
    userInstance.password = undefined;
    const [result] = await userInstance.destroy();
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};
