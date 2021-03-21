import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import IProject from '../../../../../../shared/interfaces/project';
import { ProjectService } from '../../project.service';
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import ICustomer from '../../../../../../shared/interfaces/customer';

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
  customerAndProjects$: Observable<ICustomer>;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.customerAndProjects$ = this.route.url.pipe(
      switchMap((urlSegs) => this.projectService.getProjects(urlSegs[1].path)),
      tap(console.log)
    );
  }

  getProjects(customerId: string) {
    return this.projectService.getProjects(customerId);
  }
}
