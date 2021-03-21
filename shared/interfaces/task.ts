import ITaskLog from "./taskLog";

export default interface ITask {
  id?: string;
  description: string;
  taskLogs?: ITaskLog[];
}
