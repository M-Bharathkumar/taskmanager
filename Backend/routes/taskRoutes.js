import express from "express";
import Task from "../models/Task.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// Get tasks for a specific user
router.get("/", authenticate, async (req, res) => {
  const { userId } = req.user;
  // console.log(userId);
  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks." });
  }
});

// Add a new task
router.post("/", authenticate, async (req, res) => {
  const { date, taskInput } = req.body;
  const { userId } = req.user;
  console.log(date, taskInput);
  if (!date || !taskInput) {
    console.log("failed");
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newTask = new Task({ date, taskInput, userId });
    await newTask.save();
    res.status(201).json({ message: "Task added successfully." });
  } catch (err) {
    res.status(500).json({ error: "Error saving task." });
  }
});

// Delete a task
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task." });
  }
});

export default router;
