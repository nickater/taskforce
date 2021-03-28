import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import ITask from '../../../../shared/interfaces/task';
import { TaskLogService } from '../services/task-log.service';
import { TaskService } from '../services/task.service';

@Injectable({
  providedIn: 'root',
})
export class TaskLogAdapterService {
  constructor(
    private taskLogService: TaskLogService,
    private taskService: TaskService
  ) {}

  getTaskAndTaskLogs(taskId: number) {
    return this.taskLogService.getTaskLogsByTaskId(taskId).pipe(
      switchMap((taskLogs) =>
        this.taskService.getTaskById(taskId).pipe(
          map((task) => ({
            ...task,
            taskLogs,
          }))
        )
      )
    );
  }
}
