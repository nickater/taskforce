import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { switchMap, take } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';
import ICustomer from '../../../../../shared/interfaces/customer';

@Component({
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss'],
})
export class CustomerViewComponent implements OnInit {
  // Icons
  trash = faTrashAlt;
  edit = faEdit;
  plus = faPlus;
  //
  customers$: Observable<ICustomer[]>;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers();
  }

  deleteCustomer(customerId: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customers$ = this.customerService
        .deleteCustomer(customerId)
        .pipe(switchMap(() => this.customerService.getCustomers()));
    }
  }
}
