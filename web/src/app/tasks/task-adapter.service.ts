import { Injectable } from '@angular/core';
import { concat, forkJoin, from, Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import IProject from '../../../../shared/interfaces/project';
import { ProjectService } from '../services/project.service';
import { TaskLogService } from '../services/task-log.service';
import { TaskService } from '../services/task.service';

@Injectable({
  providedIn: 'root',
})
export class TaskAdapterService {
  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private taskLogService: TaskLogService
  ) {}

  getProjectAndTasks(projectId: string): Observable<IProject> {
    return this.projectService.getProjectById(projectId).pipe(
      switchMap((project) => {
        return this.taskService.getTasksByProjectId(project.id).pipe(
          map((tasks) => ({
            ...project,
            tasks,
          }))
        );
      })
    );
  }
}
