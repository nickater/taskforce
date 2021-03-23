import { Table, Column, Model, HasMany, AllowNull } from "sequelize-typescript";
import Project from "./project.model";
import ICustomer from "../../shared/interfaces/customer";
import IProject from "../../shared/interfaces/project";
@Table({
  timestamps: true,
  tableName: "customers",
  underscored: true,
})
export default class Customer extends Model implements ICustomer {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  isActive?: boolean;

  @HasMany(() => Project)
  projects?: IProject[];
}
