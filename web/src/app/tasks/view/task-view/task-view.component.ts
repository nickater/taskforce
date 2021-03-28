import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';
import IProject from '../../../../../../shared/interfaces/project';
import ITaskLog from '../../../../../../shared/interfaces/taskLog';
import { TaskAdapterService } from '../../task-adapter.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  // Icons
  trash = faTrashAlt;
  edit = faEdit;
  plus = faPlus;
  //
  projectAndTasks$: Observable<IProject>;
  customerId: string;
  projectId: string;
  taskId: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private taskAdapterService: TaskAdapterService
  ) {}

  ngOnInit(): void {
    this.projectAndTasks$ = this.getTasks();
  }

  getTasks() {
    return this.route.url.pipe(
      map((urlSegs) => ({
        customerId: urlSegs[1].path,
        projectId: urlSegs[3].path,
      })),
      tap((ids) => {
        this.customerId = ids.customerId;
        this.projectId = ids.projectId;
      }),
      switchMap((ids) =>
        this.taskAdapterService.getProjectAndTasks(ids.projectId)
      )
    );
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.projectAndTasks$ = this.taskService.deleteTask(taskId).pipe(
        take(1),
        switchMap(() =>
          this.taskAdapterService.getProjectAndTasks(this.projectId)
        )
      );
    }
  }

  getTotalTimeLogged(taskLogs: ITaskLog[]) {
    let totalTime = 0;
    taskLogs?.forEach((log) => (totalTime += log.durationInMinutes));
    return totalTime;
  }
}
