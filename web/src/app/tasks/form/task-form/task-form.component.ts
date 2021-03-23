import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import ITask from '../../../../../../shared/interfaces/task';
import { TaskService } from '../../task.service';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskFormGroup: FormGroup;
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
    this.initializeForm();
  }

  initializeForm() {
    this.isNewOrEdit()
      .pipe(
        switchMap((res) => {
          if (res) {
            return this.taskService.getTaskById(res);
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe((task) => {
        this.taskFormGroup = this.buildForm(task);
      });
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
          return urlSegs[options.edit.taskId].path;
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

  submit() {
    of(this.taskId)
      .pipe(
        switchMap((id) => {
          if (id) {
            console.log(this.taskFormGroup.value);
            return this.taskService.updateTask({
              id,
              ...this.taskFormGroup.value,
            });
          } else {
            return this.taskService.createTask(this.taskFormGroup.value);
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
