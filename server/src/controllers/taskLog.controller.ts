import Task from "../models/task.model";
import { NextFunction, Request, Response } from "express";
import TaskLog from "../models/taskLog.model";
import { decodeJwt, UserCredentials } from "../services/auth/authorization";

const getAllTaskLogs = async (req: Request, res: Response) => {
  try {
    const taskLogs = await TaskLog.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.json(taskLogs);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllTaskLogsByTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.taskid) return next();
  try {
    const taskLogs = await TaskLog.findAll({
      where: {
        taskId: req.query.taskid,
      },
      order: [["createdAt", "ASC"]],
    });
    res.json(taskLogs);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTaskLogById = async (req: Request, res: Response) => {
  try {
    const taskLogs = await TaskLog.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(taskLogs);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createTaskLog = async (req: Request, res: Response) => {
  try {
    const header = req.headers.authorization;
    const user = decodeJwt(header!) as UserCredentials;

    const bodyWithUserId = {
      ...req.body,
      userId: user.id,
    };
    const task = await TaskLog.create(bodyWithUserId);
    res.json(task);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const updateTaskLog = async (req: Request, res: Response) => {
  const task = await TaskLog.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(task);
};

const deleteTaskLog = async (req: Request, res: Response) => {
  await TaskLog.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.sendStatus(200);
};

export {
  getAllTaskLogs,
  getAllTaskLogsByTask,
  getTaskLogById,
  createTaskLog,
  updateTaskLog,
  deleteTaskLog,
};
