import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getAllTasksByProject,
  getTaskById,
  updateTask,
} from "../controllers/task.controller";
const router = express.Router();

router.get("/", getAllTasksByProject, getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
