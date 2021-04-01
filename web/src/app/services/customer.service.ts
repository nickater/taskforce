import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ICustomer from '../../../../shared/interfaces/customer';
import { ServerService } from '../services/server.service';
import { take } from 'rxjs/operators';

const customerEndpoint = '/customers';

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
    return this.serverService.request<ICustomer>(
      'GET',
      `${customerEndpoint}/${id}`
    );
  }

  createCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.serverService.request<ICustomer>(
      'POST',
      `${customerEndpoint}`,
      {
        ...customer,
        isActive: true,
      }
    );
  }

  updateCustomer(customer: Partial<ICustomer>): Observable<number> {
    return this.serverService.request<number>(
      'PUT',
      `${customerEndpoint}/${customer.id}`,
      { name: customer.name }
    );
  }

  deleteCustomer(customerId: number): Observable<number> {
    return this.serverService
      .request<number>('PUT', `${customerEndpoint}/${customerId}`, {
        isActive: false,
      })
      .pipe(take(1));
  }
}
