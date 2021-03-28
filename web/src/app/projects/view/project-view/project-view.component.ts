import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ProjectService } from '../../../services/project.service';
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import ICustomer from '../../../../../../shared/interfaces/customer';
import { ProjectAdapterService } from '../../project-adapter.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
})
export class ProjectViewComponent implements OnInit {
  // Icons
  trash = faTrashAlt;
  edit = faEdit;
  plus = faPlus;
  //
  customerId: string;
  customerAndProjects$: Observable<ICustomer>;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private projectAdapter: ProjectAdapterService
  ) {}

  ngOnInit(): void {
    this.customerAndProjects$ = this.getProjects();
  }

  getProjects() {
    return this.route.url.pipe(
      map((urlSegs) => urlSegs[1].path),
      tap((customerId) => (this.customerId = customerId)),
      switchMap((customerId) =>
        this.projectAdapter.getCustomerAndProjects(customerId)
      )
    );
  }

  deleteProject(projectId: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.customerAndProjects$ = this.projectService
        .deleteProject(projectId)
        .pipe(
          switchMap(() =>
            this.projectAdapter.getCustomerAndProjects(this.customerId)
          )
        );
    }
  }
}
