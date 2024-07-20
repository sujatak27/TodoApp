const User = require("../models/userModel.js");
const Task = require("../models/taskModel.js");

const createTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;

    const { use} = req.params;rId 
    if (!title || !description || !status || !assignedTo || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({userId});
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
  } catch (err) {
    console.log("Error in createTask controller", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const { taskId, title, description, status } = req.body;
    if (!userId || !taskId) {
      return res
        .status(400)
        .json({ error: "Both userId and taskId are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found to whom the task is assigned" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (user.role !== "Admin" && task.assignedTo !== userId) {
      return res.status(401).json({ error: "You can't update other's tasks." });
    }

    if (title && task.title !== title) {
      task.title = title;
    }

    if (description && task.description !== description) {
      task.description = description;
    }

    if (status && task.status !== status) {
      task.status = status;
    }

    const updatedTask = await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    console.log("Error in updateTask controller", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const { taskId } = req.body;
    if (!userId || !taskId) {
      return res
        .status(400)
        .json({ error: "Both userId and taskId are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found to whom the task is assigned" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (user.role !== "Admin" && task.assignedTo !== userId) {
      return res.status(401).json({ error: "You can't delete other's tasks." });
    }

    const deletedTask = await Task.deleteOne({ _id: taskId });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log("Error in deleteTask controller", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
};
