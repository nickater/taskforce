import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';
import { ProjectService } from 'src/app/services/project.service';
import ICustomer from '../../../../shared/interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class ProjectAdapterService {
  constructor(
    private customerService: CustomerService,
    private projectServie: ProjectService
  ) {}

  getCustomerAndProjects(customerId: string): Observable<ICustomer> {
    return this.customerService.getCustomerById(customerId).pipe(
      switchMap((customer) =>
        this.projectServie.getProjectsByCustomerId(customerId).pipe(
          map((projects) => ({
            ...customer,
            projects,
          }))
        )
      )
    );
  }
}
