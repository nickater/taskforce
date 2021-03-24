import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { TaskLogService } from '../task-log.service';
import { faClock } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-task-log-form',
  templateUrl: './task-log-form.component.html',
  styleUrls: ['./task-log-form.component.scss'],
})
export class TaskLogFormComponent implements OnInit {
  taskLogFormGroup: FormGroup;
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
    this.initializeForm();
  }

  initializeForm() {
    this.fetchIds().subscribe((ids) => {
      this.taskLogFormGroup = this.buildForm(ids.taskId);
    });
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
      taskId: this.fb.control(this.taskId),
    });
    return formGroup;
  }

  submit() {
    of(this.taskId)
      .pipe(
        switchMap((id) =>
          this.taskLogService.createTaskLog(this.taskLogFormGroup.value)
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
