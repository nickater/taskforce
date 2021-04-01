import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ITask from '../../../../shared/interfaces/task';
import { ServerService } from '../services/server.service';

const tasksEndpoint = '/tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private serverService: ServerService) {}

  getTasksByProjectId(projectId: number): Observable<ITask[]> {
    const params = new HttpParams().append('projectid', `${projectId}`);
    return this.serverService.request<ITask[]>(
      'GET',
      `${tasksEndpoint}`,
      {},
      params
    );
  }

  getTaskById(taskId: number): Observable<ITask> {
    return this.serverService.request<ITask>(
      'GET',
      `${tasksEndpoint}/${taskId}`
    );
  }

  createTask(task: ITask): Observable<ITask> {
    return this.serverService.request<ITask>('POST', `${tasksEndpoint}`, task);
  }

  updateTask(task: Partial<ITask>): Observable<number> {
    return this.serverService.request<number>(
      'PUT',
      `${tasksEndpoint}/${task.id}`,
      task
    );
  }

  deleteTask(taskId: number): Observable<number> {
    return this.serverService.request<number>(
      'PUT',
      `${tasksEndpoint}/${taskId}`,
      {
        isActive: false,
      }
    );
  }
}
