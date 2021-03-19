import { Table, Column, Model, HasMany, AllowNull } from "sequelize-typescript";
import Project from "./project.model";

@Table({
  timestamps: true,
  tableName: "customers",
  underscored: true,
})
export default class Customer extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  isActive: boolean = true;

  @HasMany(() => Project)
  projects?: Project[];
}
