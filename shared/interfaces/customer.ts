import IProject from "./project";

export default interface ICustomer {
  id?: string;
  name: string;
  isActive?: boolean;
  projects?: IProject[];
}
