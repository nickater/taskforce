import { Table, Model, HasMany } from "sequelize-typescript";
import TaskLog from "./taskLog.model";

@Table({
  timestamps: true,
  tableName: "users",
  underscored: true,
})
export default class User extends Model {
  @HasMany(() => TaskLog)
  taskLogs?: TaskLog[];
}
