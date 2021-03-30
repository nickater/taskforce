import express from "express";
import {
  getAllTaskLogsByTask,
  createTaskLog,
  deleteTaskLog,
  updateTaskLog,
  getAllTaskLogs,
  getTaskLogById,
} from "../controllers/taskLog.controller";
const router = express.Router();

router.get("/", getAllTaskLogsByTask, getAllTaskLogs);
router.get("/:id", getTaskLogById);
router.post("/", createTaskLog);
router.put("/:id", updateTaskLog);
router.delete("/:id", deleteTaskLog);

export default router;
