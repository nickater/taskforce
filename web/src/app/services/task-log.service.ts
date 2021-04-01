import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ITaskLog from '../../../../shared/interfaces/taskLog';
import { ServerService } from '../services/server.service';

const taskLogsEndpoint = '/tasklogs';

@Injectable({
  providedIn: 'root',
})
export class TaskLogService {
  constructor(private serverService: ServerService) {}

  getTaskLogsByTaskId(taskId: number): Observable<ITaskLog[]> {
    const params = new HttpParams().append('taskid', `${taskId}`);
    return this.serverService.request<ITaskLog[]>(
      'GET',
      `${taskLogsEndpoint}`,
      {},
      params
    );
  }

  getTaskLogById(taskLogId: number): Observable<ITaskLog> {
    return this.serverService.request<ITaskLog>(
      'GET',
      `${taskLogsEndpoint}/${taskLogId}`
    );
  }

  createTaskLog(taskLog: ITaskLog): Observable<ITaskLog> {
    return this.serverService.request<ITaskLog>(
      'POST',
      `${taskLogsEndpoint}`,
      taskLog
    );
  }

  updateTaskLog(taskLog: ITaskLog): Observable<number> {
    return this.serverService.request<number>(
      'PUT',
      `${taskLogsEndpoint}/${taskLog.id}`,
      taskLog
    );
  }
}
