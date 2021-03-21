import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import IProject from '../../../../../../shared/interfaces/project';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectFormGroup: FormGroup;
  projectId: string;
  customerId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectService: ProjectService,
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
            return this.projectService.getProjectById(res);
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe((project) => {
        this.projectFormGroup = this.buildForm(project);
      });
  }

  isNewOrEdit() {
    return this.route.url.pipe(
      map((urlSegs) => {
        this.customerId = urlSegs[1].path;
        if (urlSegs[3].path === 'new') {
          return undefined;
        } else if (urlSegs[3].path === 'edit' && urlSegs[4]?.path) {
          this.projectId = urlSegs[4].path;
          return urlSegs[4].path;
        }
      })
    );
  }

  buildForm(project?: IProject) {
    const formGroup = this.fb.group({
      name: this.fb.control('', Validators.required),
      customerId: this.fb.control(this.customerId),
      isActive: this.fb.control(true),
    });
    if (project) {
      formGroup.get('name').patchValue(project.name);
    }
    return formGroup;
  }

  submit() {
    of(this.projectId)
      .pipe(
        switchMap((id) => {
          debugger;
          if (id) {
            console.log(this.projectFormGroup.value);
            return this.projectService.updateProject({
              id,
              ...this.projectFormGroup.value,
            });
          } else {
            return this.projectService.createProject(
              this.projectFormGroup.value
            );
          }
        }),
        take(1)
      )
      .subscribe(() =>
        this.router.navigate([`/customers/${this.customerId}/projects`])
      );
  }
}
