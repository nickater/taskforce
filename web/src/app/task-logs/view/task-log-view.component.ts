import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { tap, switchMap, take, map } from 'rxjs/operators';
import { TaskLogService } from 'src/app/services/task-log.service';
import ITask from '../../../../../shared/interfaces/task';
import { TaskLogAdapterService } from '../task-log-adapter.service';

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
  // customerId: string;
  // projectId: string;
  taskId: number;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskLogService,
    private router: Router,
    private taskLogAdapterService: TaskLogAdapterService
  ) {}

  ngOnInit(): void {
    this.taskAndTaskLogs$ = this.getTaskLogs();
  }

  getTaskLogs() {
    return this.route.url.pipe(
      map((urlSegs) => Number(urlSegs[5].path)),
      tap((taskId) => (this.taskId = taskId)),
      switchMap((taskId) =>
        this.taskLogAdapterService.getTaskAndTaskLogs(taskId)
      )
    );
  }
}
