import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { CustomerService } from 'src/app/services/customer.service';
import ICustomer from '../../../../../shared/interfaces/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  // Icons
  customerIcon = faUserPlus;
  //
  customerFormGroup$: Observable<FormGroup>;
  customerId: string;
  customerAddFailed = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerFormGroup$ = this.fetchForm();
  }

  fetchForm() {
    return this.isNewOrEdit().pipe(
      switchMap((res) => {
        if (res) {
          return this.customerService.getCustomerById(res);
        } else {
          return of(undefined);
        }
      }),
      map((customer) => this.buildForm(customer))
    );
  }

  isNewOrEdit() {
    return this.route.url.pipe(
      map((urlSegs) => {
        if (urlSegs[1].path === 'new') {
          return undefined;
        } else if (urlSegs[2].path === 'edit' && urlSegs[1].path) {
          this.customerId = urlSegs[1].path;
          return urlSegs[1].path;
        }
      })
    );
  }

  buildForm(customer?: ICustomer) {
    const formGroup = this.fb.group({
      name: this.fb.control('', Validators.required),
    });
    if (customer) {
      formGroup.get('name').patchValue(customer.name);
    }
    return formGroup;
  }

  submit(customerFormGroup: FormGroup) {
    of(this.customerId)
      .pipe(
        switchMap((id) => {
          if (id) {
            return this.customerService.updateCustomer({
              id,
              ...customerFormGroup.value,
            });
          } else {
            return this.customerService.createCustomer(customerFormGroup.value);
          }
        }),
        take(1)
      )
      .subscribe(
        () => this.router.navigate(['/customers']),
        () => {
          this.customerAddFailed = true;
        }
      );
  }
}
