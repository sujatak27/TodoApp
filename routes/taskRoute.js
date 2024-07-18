const { Router } = require("express");

// const { protectRoute } = require("../middlewares/protectRoute.js");
const {
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController.js");

const router = Router();

router.post("/create/:id", createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;
