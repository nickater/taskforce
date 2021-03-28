import express from "express";
import {
  getProjectById,
  createProject,
  deleteProject,
  getAllProjectsByCustomer,
  updateProject,
  getAllProjects,
} from "../controllers/project.controller";
import Project from "../models/project.model";
const router = express.Router();

router.get("/", getAllProjectsByCustomer, getAllProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
