import ITaskLog from "./taskLog";

export default interface ITask {
  id?: number;
  description: string;
  taskLogs?: ITaskLog[];
}
