import { Sequelize } from "sequelize-typescript";

export const db = new Sequelize({
  database: "taskforce_app_development",
  dialect: "postgres",
  username: "postgres",
  password: process.env.TASKFORCE_SQL_PASS,
  models: [__dirname + "/models/*"],
});
