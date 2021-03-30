import Project from "../models/project.model";
import { NextFunction, Request, Response } from "express";
import Task from "../models/task.model";
import TaskLog from "../models/taskLog.model";

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      where: {
        isActive: true,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAllTasksByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.projectid) return next();
  try {
    const tasks = await Task.findAll({
      where: {
        projectId: req.query.projectid,
        isActive: true,
      },
      include: {
        model: TaskLog,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        isActive: true,
      },
    });
    res.json(task);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const updateTask = async (req: Request, res: Response) => {
  const task = await Task.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(task);
};

const deleteTask = async (req: Request, res: Response) => {
  await Task.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.sendStatus(200);
};

export {
  getAllTasks,
  getAllTasksByProject,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
