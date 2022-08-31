const path = require("path");
const { Router } = require("express");
const multer = require("multer");

const GroupController = require("../controllers/group.controller");
const groupRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

groupRouter.get("/users/:userId", GroupController.getAllGroupsByUser);
groupRouter.post("/", GroupController.createGroupByUser);
groupRouter.post("/:groupId/image", upload.single("image"), GroupController.createImageToGroup);

module.exports = groupRouter;
