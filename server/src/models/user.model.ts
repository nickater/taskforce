import { Table, Model, HasMany, Column, AllowNull } from "sequelize-typescript";
import TaskLog from "./taskLog.model";

@Table({
  timestamps: true,
  tableName: "users",
  underscored: true,
})
export default class User extends Model {
  @HasMany(() => TaskLog)
  taskLogs?: TaskLog[];

  @AllowNull(false)
  @Column
  emailAddress!: string;

  @AllowNull(false)
  @Column
  hashedPassword!: string;
}
