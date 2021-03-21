import express from "express";
import Customer from "../models/customer.model";
const router = express.Router();

// Read
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll();
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

// Get all projects by Customer ID
router.get("/:id/projects", async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: "projects",
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
