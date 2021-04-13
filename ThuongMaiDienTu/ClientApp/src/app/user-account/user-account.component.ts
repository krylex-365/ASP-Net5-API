import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Account } from '../../models/account';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-user-account',
    templateUrl: './user-account.component.html',
    styleUrls: ['./user-account.component.css']
})
/** user component*/
export class UserAccountComponent implements OnInit{
  /** user ctor */
  customers: Array<Customer>;
  accounts: Array<Account>;
  constructor(private customerService: CustomerService, private accountService: AccountService) {

  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      result => {
        this.customers = result;
        console.log(this.customers);
      });
    this.accountService.getAccounts().subscribe(
      result => {
        this.accounts = result;
        console.log(this.accounts);
      });
  }
}
