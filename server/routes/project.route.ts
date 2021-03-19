import express from "express";
import Project from "../models/project.model";
const router = express.Router();

// Read
router.get("/", async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
});

// By ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    res.json(project);
  } catch (error) {
    res.sendStatus(500).json({
      error,
    });
  }
});

// Get all tasks by Project ID
router.get("/:id/tasks", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, { include: "tasks" });
    res.json(project?.tasks);
  } catch (error) {
    res.sendStatus(500).json({
      error,
    });
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (error) {
    res.sendStatus(500).json({
      error,
    });
  }
});

// Update
router.put("/:id", async (req, res) => {
  const project = await Project.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(project);
});

// Delete
router.delete("/:id", async (req, res) => {
  const project = await Project.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.sendStatus(200);
});

module.exports = router;
