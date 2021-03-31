import { Sequelize } from "sequelize-typescript";

export default new Sequelize({
  database: "taskforce_app_development",
  dialect: "postgres",
  username: "postgres",
  password: process.env.TASKFORCE_SQL_PASS,
  models: [__dirname + "/src/models/*"],
});
