import { Injectable } from '@angular/core';
import ITask from '../../../../shared/interfaces/task';
import ITaskLog from '../../../../shared/interfaces/taskLog';
import { ServerService } from '../services/server.service';

@Injectable({
  providedIn: 'root',
})
export class TaskLogService {
  constructor(private serverService: ServerService) {}

  getTaskLogs(taskId: string) {
    return this.serverService.request<ITask>(
      'GET',
      `/tasks/${taskId}/taskLogs`
    );
  }

  createTaskLog(taskLog: ITaskLog) {
    return this.serverService.request<ITaskLog>('POST', `/taskLogs`, taskLog);
  }
}
