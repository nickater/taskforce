import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

export function createJwt(credentials: UserCredentials) {
  let token;
  if (secretKey) {
    token = jwt.sign(credentials, secretKey, { expiresIn: 60 * 60 * 24 });
  } else {
    console.error("Enviroment variables not set");
  }
  return token;
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey!, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export function decodeJwt(idToken: string) {
  if (!secretKey) return;

  if (idToken) {
    const token = idToken.split(" ")[1];

    const verifiedToken = jwt.verify(token, secretKey!);
    return verifiedToken;
  }
}

export interface UserCredentials {
  id: number;
  emailAddress: string;
}
