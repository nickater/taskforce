import Customer from "../models/customer.model";
import { Request, Response } from "express";
import Project from "../models/project.model";

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll({
      where: {
        isActive: true,
      },
      order: [["createdAt", "ASC"]],
    });
    res.json(customers);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    res.json(customer);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(customer);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
