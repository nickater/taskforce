import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import db from "./db";
import { authenticateJWT } from "./services/auth/authorization";
import CustomerRouter from "./routes/customer.route";
import ProjectRouter from "./routes/project.route";
import TaskRouter from "./routes/task.route";
import TaskLogRouter from "./routes/taskLog.route";
import AuthRouter from "./routes/auth.route";

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

db.authenticate().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
