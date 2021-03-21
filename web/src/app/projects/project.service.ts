import { Injectable } from '@angular/core';
import { ServerService } from '../services/server.service';
import IProject from '../../../../shared/interfaces/project';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private serverService: ServerService) {}

  getProjects(customerId: string) {
    return this.serverService.request<IProject[]>(
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
}
