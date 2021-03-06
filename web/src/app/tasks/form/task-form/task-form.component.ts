import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import ITask from '../../../../../../shared/interfaces/task';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskFormGroup$: Observable<FormGroup>;
  customerId: string;
  projectId: string;
  taskId: string;
  tasksIcon = faTasks;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskFormGroup$ = this.initializeForm();
  }

  initializeForm() {
    return this.isNewOrEdit().pipe(
      switchMap((res) => {
        if (res) {
          return this.taskService.getTaskById(res);
        } else {
          return of(undefined);
        }
      }),
      map((task) => this.buildForm(task))
    );
  }

  isNewOrEdit() {
    const options = {
      customerId: 1,
      projectId: 3,
      new: 5,
      edit: {
        option: 6,
        taskId: 5,
      },
    };

    return this.route.url.pipe(
      map((urlSegs) => {
        this.customerId = urlSegs[options.customerId].path;
        this.projectId = urlSegs[options.projectId].path;

        if (urlSegs[options.new].path === 'new') {
          return undefined;
        } else if (
          urlSegs[options.edit.option].path === 'edit' &&
          urlSegs[options.edit.taskId]?.path
        ) {
          this.taskId = urlSegs[options.edit.taskId].path;
          return Number(urlSegs[options.edit.taskId].path);
        }
      })
    );
  }

  buildForm(task?: ITask) {
    const formGroup = this.fb.group({
      description: this.fb.control('', Validators.required),
      projectId: this.fb.control(this.projectId),
      isActive: this.fb.control(true),
    });
    if (task) {
      formGroup.get('description').patchValue(task.description);
    }
    return formGroup;
  }

  submit(taskFormGroup: FormGroup) {
    of(this.taskId)
      .pipe(
        switchMap((id) => {
          if (id) {
            return this.taskService.updateTask({
              id,
              ...taskFormGroup.value,
            });
          } else {
            return this.taskService.createTask(taskFormGroup.value);
          }
        }),
        take(1)
      )
      .subscribe(() =>
        this.router.navigate([
          `/customers/${this.customerId}/projects/${this.projectId}/tasks`,
        ])
      );
  }
}
