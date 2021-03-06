import {
  Table,
  Column,
  Model,
  HasMany,
  AllowNull,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Project from "./project.model";
import TaskLog from "./taskLog.model";
import ITask from "../../../shared/interfaces/task";
@Table({
  timestamps: true,
  tableName: "tasks",
  underscored: true,
})
export default class Task extends Model implements ITask {
  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column
  isActive?: boolean;

  @BelongsTo(() => Project)
  project?: Project;

  @AllowNull(false)
  @ForeignKey(() => Project)
  @Column
  projectId!: number;

  @HasMany(() => TaskLog)
  taskLogs?: TaskLog[];
}
