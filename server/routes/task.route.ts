import express from "express";
import Task from "../models/task.model";
const router = express.Router();

// Read
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    res.json(task);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get TaskLogs by Task Id
router.get("/:id/taskLogs", async (req, res) => {
  try {
    console.log(req.params.id);
    const task = await Task.findByPk(req.params.id, { include: "taskLogs" });
    res.json(task);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(task);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
