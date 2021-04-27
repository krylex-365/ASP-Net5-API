import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Account } from '../../models/account';
import { UserAddService } from '../../services/user-add.service';
import { AccountService } from '../../services/account.service';
import { RoleService } from '../../services/role.service';

@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html',
    styleUrls: ['./user-add.component.scss']
})
/** user-add component*/
export class UserAddComponent implements OnInit{
  /** user-add ctor */
  sex: string;
  roleId: string;
  account: Account;
  customer: Customer;

  constructor(private customerService: CustomerService,
    private accountService: AccountService,
    private roleService: RoleService) { }

  ngOnInit() {
    this.sex = "";
    this.roleId = "";
  }

  add(value) {
    console.log(value);
    this.account.accountId = "1" //C# xử lý
    if (value.avatar) {
      this.account.avatar = value.avatar.substr(value.avatar.lastIndexOf("\\") + 1);
    } else {
      this.account.avatar = "default.jpg";
    }
    this.account.customer = null;
    this.account.password = value.password;
    this.account.roleId = value.roleId;
    this.account.status = "1";
    this.account.userName = value.userName;
    this.customer.accountId = "1" //C# xử lý
    this.customer.address = value.address;
    this.customer.birthday = value.birthday;
    this.customer.customerId = "1" //C# xử lý
    this.customer.mail = value.mail;
    this.customer.name = value.name;
    this.customer.order = null;
    this.customer.phoneNumber = value.phoneNumber;
    this.customer.review = null;
    this.customer.sex = value.sex;
    this.customer.status = "1";
  }
}
