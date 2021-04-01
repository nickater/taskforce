import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import db from "./db";
import { authenticateJWT } from "./src/services/auth/authorization";
import {
  AuthRouter,
  CustomerRouter,
  ProjectRouter,
  TaskRouter,
  TaskLogRouter,
} from "./src/routes/router-exports";

const PORT = process.env.TASKFORCE_SERVER_PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

// Routes
app.use("/auth", AuthRouter);
app.use("/customers", authenticateJWT, CustomerRouter);
app.use("/projects", authenticateJWT, ProjectRouter);
app.use("/tasks", authenticateJWT, TaskRouter);
app.use("/tasklogs", authenticateJWT, TaskLogRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Route not found");
  res.status(404);
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(res.statusCode || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

db.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
