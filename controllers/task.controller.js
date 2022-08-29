const { Task } = require("../models");

module.exports.createTask = async (req, res, next)=>{
  try {
    const {body, userInstance} = req;
    // const createdTask = await Task.create({...body, userId:id})
    const createdTask = await userInstance.createTask(body)
    res.status(201).send({data: createdTask})
  } catch (error) {
    next(error)
  }
}

module.exports.getUserTasks = async (req, res, next)=>{
  try {
    const {userInstance, pagination} = req;
    const tasks = await userInstance.getTasks({
      ...pagination
    });
    res.status(200).send({data: tasks})
  } catch (error) {
    next(error)
  }
}