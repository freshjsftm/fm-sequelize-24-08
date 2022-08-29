const { Router } = require("express");
const TaskController = require("../controllers/task.controller");
const { checkUser } = require("../middlewares/user.mw");
const { paginate } = require("../middlewares/paginate.mw");
const taskRouter = Router();

taskRouter.post("/users/:userId", checkUser, TaskController.createTask);
taskRouter.get("/users/:userId", paginate, checkUser, TaskController.getUserTasks);
//taskRouter.get("/:taskId/users/:userId", checkUser, TaskController.getUserTask);

module.exports = taskRouter;