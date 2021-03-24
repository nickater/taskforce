import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { CustomerViewComponent } from './customers/view/customer-view.component';
import { ProjectFormComponent } from './projects/form/project-form/project-form.component';
import { ProjectViewComponent } from './projects/view/project-view/project-view.component';
import { TaskLogFormComponent } from './task-logs/form/task-log-form.component';
import { TaskLogViewComponent } from './task-logs/view/task-log-view.component';
import { TaskFormComponent } from './tasks/form/task-form/task-form.component';
import { TaskViewComponent } from './tasks/view/task-view/task-view.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'customers',
    component: CustomerViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/new',
    component: CustomerFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id/edit',
    component: CustomerFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id/projects',
    component: ProjectViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id/projects/new',
    component: ProjectFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id/projects/:id/edit',
    component: ProjectFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id/projects/:id/tasks',
    component: TaskViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id/projects/:id/tasks/new',
    component: TaskFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id/projects/:id/tasks/:id/edit',
    component: TaskFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id/projects/:id/tasks/:id/logs',
    component: TaskLogViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id/projects/:id/tasks/:id/logs/new',
    component: TaskLogFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/customers',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
