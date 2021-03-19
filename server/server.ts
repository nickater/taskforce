import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { db } from "./db";

const app = express();

app.use(express.json());
const PORT = process.env.TASKFORCE_SERVER_PORT || 8000;

db.authenticate().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

app.use("/customers", require("./routes/customer.route"));
app.use("/projects", require("./routes/project.route"));
app.use("/tasks", require("./routes/task.route"));
app.use("/taskLogs", require("./routes/taskLog.route"));
