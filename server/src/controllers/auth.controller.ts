import { Request, Response } from "express";
import { createJwt } from "../services/auth/authorization";
import bcrypt from "bcrypt";
import User from "../models/user.model";

const register = async (req: Request, res: Response) => {
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
};

const login = async (req: Request, res: Response) => {
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
};

export { register, login };
