import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Account } from '../../../models/account';
import { Customer } from '../../../models/customer';
import { AccountService } from '../../../services/account.service';
import { CustomerService } from '../../../services/customer.service';
declare var $: any;
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
/** profile component*/
export class ProfileComponent implements OnInit{
  /** profile ctor */

  //US
  currentUser;
  token
  accountId: string;
  customerId: string;
  customer: Customer;
  account: Account;

  //ngModel
  avatar: string;
  password: string;
  address: string;
  birthday: Date;
  mail: string;
  name: string;
  phoneNumber: string;
  sex: string;
  bool: boolean;

  constructor(private customerService: CustomerService,
    private accountService: AccountService,) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    if (this.currentUser != null) {
      this.token = jwt_decode(this.currentUser.token);

      //Customer
      this.customerId = this.token.CustomerId;
      this.accountId = this.token.AccountId;

      //Get customer
      this.customerService.getCustomerById(this.customerId).subscribe(
        result => {
          this.customer = result;
          console.log(this.customer);

          this.name = this.customer.name;
          this.address = this.customer.address;
          this.birthday = this.customer.birthday;
          this.mail = this.customer.mail;
          this.phoneNumber = this.customer.phoneNumber;
          this.sex = this.customer.sex;
        });
      //Get account
      this.accountService.getAccountById(this.accountId).subscribe(
        result => {
          this.account = result;
          console.log(this.account);

          this.password = this.account.password;
          this.avatar = this.account.avatar;
        });

    }


    $(document).ready(function () {
        $("#datepickerBirthday").datepicker();
    });
  }

  async update(value) {
    console.log(value);

    if (value.avatar) {
      this.account.avatar = value.avatar.substr(value.avatar.lastIndexOf("\\") + 1);
    }
    this.account.password = value.password;
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
      this.refresh();
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
