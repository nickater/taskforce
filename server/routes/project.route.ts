import express from "express";
import Project from "../models/project.model";
import Task from "../models/task.model";
const router = express.Router();

// Read
router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        isActive: true,
      },
    });
    res.json(projects);
  } catch (error) {
    res.sendStatus(500);
  }
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

// Get all active tasks by Project ID
router.get("/:id/tasks", async (req, res) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Task,
          where: {
            isActive: true,
          },
          required: false,
        },
      ],
    });
    res.json(project);
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
