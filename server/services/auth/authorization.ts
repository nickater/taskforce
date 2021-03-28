import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

export function createJwt(credentials: UserCredentials) {
  let token;
  if (secretKey) {
    token = jwt.sign(credentials, secretKey);
  } else {
    console.error("Enviroment variables not set");
  }
  return token;
}

export const authenticateJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey!, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
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
