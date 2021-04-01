import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import IProject from '../../../../shared/interfaces/project';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

const projectEndpoint = '/projects';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private serverService: ServerService) {}

  getProjectsByCustomerId(customerId: string): Observable<IProject[]> {
    const params = new HttpParams().append('customerid', customerId);
    return this.serverService.request<IProject[]>(
      'GET',
      `${projectEndpoint}`,
      {},
      params
    );
  }

  getProjectById(projectId: string): Observable<IProject> {
    return this.serverService.request<IProject>(
      'GET',
      `${projectEndpoint}/${projectId}`
    );
  }

  createProject(project: IProject): Observable<IProject> {
    return this.serverService.request<IProject>(
      'POST',
      `${projectEndpoint}/`,
      project
    );
  }

  updateProject(project: Partial<IProject>): Observable<IProject> {
    return this.serverService.request<IProject>(
      'PUT',
      `${projectEndpoint}/${project.id}`,
      project
    );
  }

  deleteProject(projectId: number): Observable<IProject> {
    return this.serverService
      .request<IProject>('PUT', `/projects/${projectId}`, {
        isActive: false,
      })
      .pipe(take(1));
  }
}
