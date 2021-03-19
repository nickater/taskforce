import {
  Table,
  Column,
  Model,
  HasMany,
  AllowNull,
  DataType,
  IsUUID,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Project from "./project.model";
import TaskLog from "./taskLog.model";
import { v4 as uuid } from "uuid";

@Table({
  timestamps: true,
  tableName: "tasks",
  underscored: true,
})
export default class Task extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column
  isActive!: boolean;

  @BelongsTo(() => Project)
  project?: Project;

  @AllowNull(false)
  @ForeignKey(() => Project)
  @Column
  projectId!: number;

  @HasMany(() => TaskLog)
  taskLogs?: TaskLog[];
}
