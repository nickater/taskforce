import express from "express";
import TaskLog from "../models/taskLog.model";
const router = express.Router();

// Read
router.get("/", async (req, res) => {
  try {
    const taskLogs = await TaskLog.findAll();
    res.json(taskLogs);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const taskLog = await TaskLog.findByPk(req.params.id);
    res.json(taskLog);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const taskLog = await TaskLog.create(req.body);
    res.json(taskLog);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const taskLog = await TaskLog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(taskLog);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const taskLog = await TaskLog.destroy({
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
