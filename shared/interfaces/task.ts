import ITaskLog from "./taskLog";

export default interface ITask {
  id?: number;
  description: string;
  projectId: number;
  taskLogs?: ITaskLog[];
}
