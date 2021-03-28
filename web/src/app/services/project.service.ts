import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import IProject from '../../../../shared/interfaces/project';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import ICustomer from '../../../../shared/interfaces/customer';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private serverService: ServerService) {}

  getProjectsByCustomerId(customerId: string) {
    const params = new HttpParams().append('customerid', customerId);
    return this.serverService.request<IProject[]>(
      'GET',
      `/projects`,
      {},
      params
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
