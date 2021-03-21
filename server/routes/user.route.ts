import express from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { createJwt } from "../services/auth/authorization";
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      emailAddress,
      hashedPassword,
    });

    let token = createJwt({ emailAddress, id: user.id });
    res.json({ idToken: token });
  } catch (error) {
    res.sendStatus(500);
  }
});

// Login User
router.post("/login", async (req, res) => {
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;
  const user = await User.findOne({
    where: {
      emailAddress,
    },
  });

  if (user) {
    if (await bcrypt.compare(password, user.hashedPassword)) {
      let token = createJwt({ emailAddress, id: user.id });
      res.json({ idToken: token, auth: true });
    } else {
      res.status(400).json({
        msg: "Incorrect email or password",
      });
    }
  } else {
    res.status(404).send();
  }
});

module.exports = router;
