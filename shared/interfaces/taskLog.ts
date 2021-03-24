export default interface ITaskLog {
  id?: number;
  durationInMinutes?: number;
  taskId: number;
  createdAt?: Date;
}
