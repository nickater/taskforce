import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CustomerViewComponent } from './customers/view/customer-view.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectViewComponent } from './projects/view/project-view/project-view.component';
import { ProjectFormComponent } from './projects/form/project-form/project-form.component';
import { TaskViewComponent } from './tasks/view/task-view/task-view.component';
import { TaskFormComponent } from './tasks/form/task-form/task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CustomerViewComponent,
    CustomerFormComponent,
    ProjectViewComponent,
    ProjectFormComponent,
    TaskViewComponent,
    TaskFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
