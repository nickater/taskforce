import {
  Table,
  Column,
  Model,
  HasMany,
  AllowNull,
  Unique,
} from "sequelize-typescript";
import Project from "./project.model";
import ICustomer from "../../../shared/interfaces/customer";

@Table({
  timestamps: true,
  tableName: "customers",
  underscored: true,
})
export default class Customer extends Model implements ICustomer {
  @AllowNull(false)
  @Unique
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  isActive?: boolean;

  @HasMany(() => Project)
  projects?: Project[];
}
