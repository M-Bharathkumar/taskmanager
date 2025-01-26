import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
//mongodb disconnected message

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Handle unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
  console.log("Unhandled Rejection at:", err.stack);
  // Close server and exit process
  process.exit(1);
});




// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
