import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  date: { type: String, required: true },
  taskInput: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Task", taskSchema);
