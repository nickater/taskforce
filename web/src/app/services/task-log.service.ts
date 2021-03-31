import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ITaskLog from '../../../../shared/interfaces/taskLog';
import { ServerService } from '../services/server.service';

@Injectable({
  providedIn: 'root',
})
export class TaskLogService {
  constructor(private serverService: ServerService) {}

  getTaskLogsByTaskId(taskId: number): Observable<ITaskLog[]> {
    const params = new HttpParams().append('taskid', `${taskId}`);
    return this.serverService.request<ITaskLog[]>(
      'GET',
      `/tasklogs`,
      {},
      params
    );
  }

  getTaskLogById(taskLogId: number): Observable<ITaskLog> {
    return this.serverService.request<ITaskLog>(
      'GET',
      `/tasklogs/${taskLogId}`
    );
  }

  createTaskLog(taskLog: ITaskLog): Observable<ITaskLog> {
    return this.serverService.request<ITaskLog>('POST', `/tasklogs`, taskLog);
  }
}
