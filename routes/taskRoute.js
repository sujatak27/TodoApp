const { Router } = require("express");

// const { protectRoute } = require("../middlewares/protectRoute.js");
const {
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController.js");

const router = Router();

router.post("/create/:userId", createTask);
router.put("/update/:userId", updateTask);
router.delete("/delete/:userId", deleteTask);

module.exports = router;
