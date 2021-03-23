import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { tap, switchMap, take } from 'rxjs/operators';
import ITask from '../../../../../shared/interfaces/task';
import { TaskLogService } from '../task-log.service';

@Component({
  selector: 'app-task-log-view',
  templateUrl: './task-log-view.component.html',
  styleUrls: ['./task-log-view.component.scss'],
})
export class TaskLogViewComponent implements OnInit {
  // Icons
  plus = faPlus;
  //
  taskAndTaskLogs$: Observable<ITask>;
  customerId: string;
  projectId: string;
  taskId: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskLogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskAndTaskLogs$ = this.route.url.pipe(
      tap((urlSegs) => (this.customerId = urlSegs[1].path)),
      tap((urlSegs) => (this.projectId = urlSegs[3].path)),
      switchMap((urlSegs) => this.getTaskLogs(urlSegs[3].path))
    );
  }

  getTaskLogs(taskId: string) {
    return this.taskService.getTaskLogs(taskId);
  }

  deleteTask(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskAndTaskLogs$ = this.taskService.getTaskLogs(taskId).pipe(
        take(1),
        switchMap(() => this.getTaskLogs(taskId))
      );
    }
  }
}
