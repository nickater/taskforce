import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ITask from '../../../../shared/interfaces/task';
import ITaskLog from '../../../../shared/interfaces/taskLog';
import { ServerService } from '../services/server.service';

@Injectable({
  providedIn: 'root',
})
export class TaskLogService {
  constructor(private serverService: ServerService) {}

  getTaskLogsByTaskId(taskId: number) {
    const params = new HttpParams().append('taskid', `${taskId}`);
    return this.serverService.request<ITaskLog[]>(
      'GET',
      `/tasklogs`,
      {},
      params
    );
  }

  getTaskLogs(taskId: number) {
    return this.serverService.request<ITask>('GET', `/tasklogs/${taskId}`);
  }

  createTaskLog(taskLog: ITaskLog) {
    return this.serverService.request<ITaskLog>('POST', `/tasklogs`, taskLog);
  }
}
