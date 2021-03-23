import express from "express";
import Customer from "../models/customer.model";
import Project from "../models/project.model";
const router = express.Router();

// Read
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll({
      where: {
        isActive: true,
      },
    });
    res.json(customers);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get by ID
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    res.json(customer);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get all active projects by Customer ID
router.get("/:id/projects", async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Project,
          where: {
            isActive: true,
          },
          required: false,
        },
      ],
    });
    res.json(customer);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Update
router.put("/:id", async (req, res) => {
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
});

// Delete
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
