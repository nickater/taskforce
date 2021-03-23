import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';
import ICustomer from '../../../../../shared/interfaces/customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  customerFormGroup: FormGroup;
  customerId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.isNewOrEdit()
      .pipe(
        switchMap((res) => {
          if (res) {
            return this.customerService.getCustomerById(res);
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe((customer) => {
        this.customerFormGroup = this.buildForm(customer);
      });
  }

  isNewOrEdit() {
    return this.route.url.pipe(
      tap(console.log),
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

  submit() {
    of(this.customerId)
      .pipe(
        tap(console.log),
        switchMap((id) => {
          if (id) {
            console.log(this.customerFormGroup.value);
            return this.customerService.updateCustomer({
              id,
              ...this.customerFormGroup.value,
            });
          } else {
            return this.customerService.createCustomer(
              this.customerFormGroup.value
            );
          }
        }),
        take(1)
      )
      .subscribe(() => this.router.navigate(['/customers']));
  }
}
