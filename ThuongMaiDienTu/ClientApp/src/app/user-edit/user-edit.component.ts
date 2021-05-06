import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Account } from '../../models/account';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReloadService } from '../../services/reload.service';
import { Page404Service } from '../../services/page404.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
/** user-edit component*/
export class UserEditComponent implements OnInit {
  /** user-edit ctor */

  customer: Customer;
  account: Account;

  avatar: string;
  password: string;
  roleId: string;
  userName: string;
  address: string;
  birthday: Date;
  mail: string;
  name: string;
  phoneNumber: string;
  sex: string;
  bool: boolean;

  constructor(private customerService: CustomerService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private page404: Page404Service,
    private reload: ReloadService) { }

  ngOnInit() {
    this.page404.go();

    const customerId = String(this.route.snapshot.paramMap.get('id'));

    this.newMethod().customerService.getCustomerById(customerId).subscribe(
      result => {
        this.customer = result;

        this.address = this.customer.address;
        this.birthday = this.customer.birthday;
        this.mail = this.customer.mail;
        this.name = this.customer.name;
        this.phoneNumber = this.customer.phoneNumber;
        this.sex = this.customer.sex;

        console.log(this.customer);
      });

    this.accountService.getAccountById(customerId).subscribe(
      result => {
        this.account = result;

        this.avatar = this.account.avatar;
        this.password = this.account.password;
        this.roleId = this.account.roleId;
        this.userName = this.account.userName;

        console.log(this.customer);
      });
  }

    private newMethod() {
        return this;
    }

  async update(value) {
    console.log(value);

    if (value.avatar) {
      this.account.avatar = value.avatar.substr(value.avatar.lastIndexOf("\\") + 1);
    }
    this.account.password = value.password;
    this.account.roleId = value.roleId;
    this.account.userName = value.userName;
    this.customer.address = value.address;
    this.customer.birthday = value.birthday;
    this.customer.mail = value.mail;
    this.customer.name = value.name;
    this.customer.phoneNumber = value.phoneNumber;
    this.customer.sex = value.sex;

    this.bool = true;

    await this.accountService.update(this.account).subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.bool = false;
        }
      });

    this.customerService.update(this.customer).subscribe(
      result => {
        console.log(result);
        if (result.status != 200) {
          this.bool = false;
        }
      });

    if (this.bool) {
      this.redirectUsers();
    }
  }

  redirectUsers() {
    this.reload.reload = "1";
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'admin/users');
  }
}
