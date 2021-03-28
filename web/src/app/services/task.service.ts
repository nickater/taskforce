import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ITask from '../../../../shared/interfaces/task';
import { ServerService } from '../services/server.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private serverService: ServerService) {}

  getTasksByProjectId(projectId: number) {
    const params = new HttpParams().append('projectid', `${projectId}`);
    return this.serverService.request<ITask[]>('GET', `/tasks`, {}, params);
  }

  getTaskById(taskId: number): Observable<ITask> {
    return this.serverService.request<ITask>('GET', `/tasks/${taskId}`);
  }

  createTask(task: ITask) {
    return this.serverService.request<ITask>('POST', `/tasks`, task);
  }

  updateTask(task: Partial<ITask>) {
    return this.serverService.request<ITask>('PUT', `/tasks/${task.id}`, task);
  }

  deleteTask(taskId: number) {
    return this.serverService.request<ITask>('PUT', `/tasks/${taskId}`, {
      isActive: false,
    });
  }
}
