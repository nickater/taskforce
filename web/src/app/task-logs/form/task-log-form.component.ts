import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { TaskLogService } from 'src/app/services/task-log.service';
import ITaskLog from '../../../../../shared/interfaces/taskLog';
@Component({
  selector: 'app-task-log-form',
  templateUrl: './task-log-form.component.html',
  styleUrls: ['./task-log-form.component.scss'],
})
export class TaskLogFormComponent implements OnInit {
  taskLogFormGroup$: Observable<FormGroup>;
  customerId: number;
  projectId: number;
  taskId: number;
  clockIcon = faClock;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskLogService: TaskLogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskLogFormGroup$ = this.initializeForm();
  }

  initializeForm() {
    return this.fetchIds().pipe(map((ids) => this.buildForm(ids.taskId)));
  }

  fetchIds() {
    const options = {
      customerId: 1,
      projectId: 3,
      taskId: 5,
    };

    return this.route.url.pipe(
      map((urlSegs) => {
        return {
          customerId: Number(urlSegs[options.customerId].path),
          projectId: Number(urlSegs[options.projectId].path),
          taskId: Number(urlSegs[options.taskId].path),
        };
      }),
      tap((res) => {
        this.customerId = res.customerId;
        this.projectId = res.projectId;
        this.taskId = res.taskId;
      })
    );
  }

  buildForm(taskId: number) {
    const formGroup = this.fb.group({
      durationInMinutes: this.fb.control('', Validators.required),
      taskId: this.fb.control(taskId),
    });
    return formGroup;
  }

  submit(taskLogFormGroup: FormGroup) {
    of(this.taskId)
      .pipe(
        switchMap((id) =>
          this.taskLogService.createTaskLog(taskLogFormGroup.value)
        ),
        take(1)
      )
      .subscribe(() =>
        this.router.navigate([
          `/customers/${this.customerId}/projects/${this.projectId}/tasks/${this.taskId}/logs`,
        ])
      );
  }
}
