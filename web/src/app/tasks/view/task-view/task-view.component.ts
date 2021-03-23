import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import IProject from '../../../../../../shared/interfaces/project';
import { TaskService } from '../../task.service';

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
  taskAndTaskLogs$: Observable<IProject>;
  projectId: string;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskAndTaskLogs$ = this.route.url.pipe(
      tap((urlSegs) => (this.projectId = urlSegs[3].path)),
      switchMap((urlSegs) => this.getTasks(urlSegs[3].path))
    );
  }

  getTasks(projectId: string) {
    return this.taskService.getTasks(projectId);
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskAndTaskLogs$ = this.taskService.deleteTask(taskId).pipe(
        take(1),
        switchMap(() => this.getTasks(this.projectId))
      );
    }
  }
}
