import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
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
  projectAndTasks$: Observable<IProject>;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.projectAndTasks$ = this.route.url.pipe(
      switchMap((urlSegs) => this.getTasks(urlSegs[3].path)),
      tap(console.log)
    );
  }

  getTasks(projectId: string) {
    return this.taskService.getTasks(projectId);
  }
}
