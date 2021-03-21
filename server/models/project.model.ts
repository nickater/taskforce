import {
  Table,
  Column,
  Model,
  HasMany,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Task from "./task.model";
import Customer from "./customer.model";
import IProject from "../../shared/interfaces/project";
import ITask from "../../shared/interfaces/task";

@Table({
  timestamps: true,
  tableName: "projects",
  underscored: true,
})
export default class Project extends Model implements IProject {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  isActive: boolean = true;

  @HasMany(() => Task)
  tasks?: ITask[];

  @AllowNull(false)
  @ForeignKey(() => Customer)
  @Column
  customerId!: number;

  @BelongsTo(() => Customer)
  customer?: Customer;
}
