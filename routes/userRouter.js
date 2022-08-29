const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const { checkUser } = require("../middlewares/user.mw");
const { paginate } = require("../middlewares/paginate.mw");
const userRouter = Router();

userRouter.get("/", paginate, UserController.getAllUsers);
userRouter.get("/:userId", checkUser, UserController.getUser);
userRouter.post("/", UserController.createUser);
userRouter.patch("/:userId", UserController.updateUser);
userRouter.patch("/v2/:userId", checkUser, UserController.updateUserInstance);
userRouter.delete("/:userId", checkUser, UserController.deleteUserInstance);

module.exports = userRouter;