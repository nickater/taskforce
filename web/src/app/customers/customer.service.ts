import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import ICustomer from '../../../../shared/interfaces/customer';
import { ServerService } from '../services/server.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private serverService: ServerService) {}

  getCustomers(): Observable<ICustomer[]> {
    return this.serverService
      .request<ICustomer[]>('GET', '/customers')
      .pipe(take(1));
  }

  getCustomerById(id: string): Observable<ICustomer> {
    return this.serverService.request<ICustomer>('GET', `/customers/${id}`);
  }

  createCustomer(customer: ICustomer) {
    return this.serverService.request<ICustomer>('POST', `/customers/`, {
      ...customer,
      isActive: true,
    });
  }

  updateCustomer(customer: Partial<ICustomer>) {
    return this.serverService.request<ICustomer>(
      'PUT',
      `/customers/${customer.id}`,
      { name: customer.name }
    );
  }

  deleteCustomer(customerId: string) {
    return this.serverService
      .request<ICustomer>('PUT', `/customers/${customerId}`, {
        isActive: false,
      })
      .pipe(take(1));
  }
}
