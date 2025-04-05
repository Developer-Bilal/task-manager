import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getTasks).post("/", createTask);

router
  .get("/:id", getTask)
  .patch("/:id", updateTask)
  .delete("/:id", deleteTask);

export default router;
