import Project from "../models/project.model";
import { NextFunction, Request, Response } from "express";

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAllProjectsByCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.customerid) return next();
  try {
    const projects = await Project.findAll({
      where: {
        customerId: req.query.customerid,
        isActive: true,
      },
    });
    res.json(projects);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(project);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const updateProject = async (req: Request, res: Response) => {
  const project = await Project.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(project);
};

const deleteProject = async (req: Request, res: Response) => {
  const project = await Project.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.sendStatus(200);
};

export {
  getAllProjects,
  getProjectById,
  getAllProjectsByCustomer,
  createProject,
  updateProject,
  deleteProject,
};
