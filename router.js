const { Router } = require("express");
const UserController = require("./controllers/user.controller");
const router = Router();

router.get("/users", UserController.getAllUsers);
router.post("/user", UserController.createUser);
router.patch("/user/:id", UserController.updateUser);
router.patch("/user-v2/:id", UserController.updateUserInstance);
router.delete("/user/:id", UserController.deleteUserInstance);
//router.put()

//router.post("/user/:id/task", TaskController.createTask);

module.exports = router;
