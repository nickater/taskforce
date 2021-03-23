import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IProject from '../../../../shared/interfaces/project';
import ITask from '../../../../shared/interfaces/task';
import { ServerService } from '../services/server.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private serverService: ServerService) {}

  getTasks(projectId: string) {
    return this.serverService.request<IProject>(
      'GET',
      `/projects/${projectId}/tasks`
    );
  }

  getTaskById(taskId: string): Observable<ITask> {
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
