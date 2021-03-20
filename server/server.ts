import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { db } from "./db";
import { authenticateJWT } from "./services/auth/authorization";
const PORT = process.env.TASKFORCE_SERVER_PORT || 8000;
const app = express();
app.use(express.json());

app.use("/customers", authenticateJWT, require("./routes/customer.route"));
app.use("/projects", authenticateJWT, require("./routes/project.route"));
app.use("/tasks", authenticateJWT, require("./routes/task.route"));
app.use("/taskLogs", authenticateJWT, require("./routes/taskLog.route"));
app.use("/auth", require("./routes/user.route"));

db.authenticate().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
