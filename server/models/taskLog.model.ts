import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Task from "./task.model";
import User from "./user.model";

@Table({
  timestamps: true,
  tableName: "task_logs",
  underscored: true,
})
export default class TaskLog extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @Column({ field: "duration_minutes" })
  durationInMinutes?: number;

  @AllowNull(false)
  @ForeignKey(() => Task)
  @Column
  taskId!: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => Task)
  task?: Task;

  @BelongsTo(() => User)
  user?: User;
}
