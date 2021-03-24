import IProject from "./project";

export default interface ICustomer {
  id?: number;
  name: string;
  isActive?: boolean;
  projects?: IProject[];
}
