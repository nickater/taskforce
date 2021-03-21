import ITask from "./task";

export default interface IProject {
  id?: number;
  name: string;
  isActive?: boolean;
  customerId?: number;
  tasks?: ITask[];
}
