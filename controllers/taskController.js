const User = require("../models/userModel.js");
const Task = require("../models/taskModel.js");

const createTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;

    const { id: userId } = req.params;
    if (!title || !description || !status || !assignedTo || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "Admin" && assignedTo.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to assign tasks to other users",
      });
    }

    const newTask = new Task({
      title,
      description,
      status,
      assignedTo,
      createdBy: userId,
    });

    const savedTask = await newTask.save();
    return res
      .status(201)
      .json({ message: "Task created successfully", task: savedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const updateTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
};
