const {User} = require('../models');

module.exports.createUser = async (req,res,next) => {
  try {
    const {body} = req;
    const createdUser = await User.create(body);
    res.status(201).send({data:createdUser})
  } catch (error) {
    next(error)
  }
}

module.exports.getAllUsers = async (req,res,next) => {
  try {
    const users = await User.findAll();
    res.status(200).send({data:users})
  } catch (error) {
    next(error)
  }
}