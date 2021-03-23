import { Injectable } from '@angular/core';
import { ServerService } from '../services/server.service';
import IProject from '../../../../shared/interfaces/project';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import ICustomer from '../../../../shared/interfaces/customer';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private serverService: ServerService) {}

  getProjects(customerId: string) {
    return this.serverService.request<ICustomer>(
      'GET',
      `/customers/${customerId}/projects`
    );
  }

  getProjectById(projectId: string): Observable<IProject> {
    return this.serverService.request<IProject>(
      'GET',
      `/projects/${projectId}`
    );
  }

  createProject(project: IProject) {
    return this.serverService.request<IProject>('POST', `/projects/`, project);
  }

  updateProject(project: Partial<IProject>) {
    return this.serverService.request<IProject>(
      'PUT',
      `/projects/${project.id}`,
      project
    );
  }

  deleteProject(projectId: number) {
    return this.serverService
      .request<IProject>('PUT', `/projects/${projectId}`, {
        isActive: false,
      })
      .pipe(take(1));
  }
}
