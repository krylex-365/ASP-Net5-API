import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../../models/account';
import { Customer } from '../../../models/customer';
import { AccountService } from '../../../services/account.service';
import { CustomerService } from '../../../services/customer.service';
import { ReloadService } from '../../../services/reload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  sex: string;
  account: Account;
  customer: Customer;
  reponse: any;

  constructor(private customerService: CustomerService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private reload: ReloadService  ) { }

  ngOnInit() {
    this.sex = "";
  }

  async add(value) {
    this.account = new Account;
    this.customer = new Customer;
    console.log(value);
    this.account.accountId = "1"; //C# xử lý
    if (value.avatar) {
      this.account.avatar = value.avatar.substr(value.avatar.lastIndexOf("\\") + 1);
    } else {
      this.account.avatar = "default.jpg";
    }
    this.account.customer = null;
    this.account.password = value.password;
    this.account.roleId = "2";
    this.account.status = "0";
    this.account.userName = value.userName;
    this.customer.accountId = "1" //C# xử lý
    this.customer.address = value.address;
    this.customer.birthday = value.birthday;
    this.customer.customerId = "1" //C# xử lý
    this.customer.mail = value.mail;
    this.customer.name = value.name;
    this.customer.order = null;
    this.customer.phoneNumber = "" + value.phoneNumber;
    this.customer.review = null;
    if (value.sex == '') {
      this.customer.sex = "Male";
    } else {
      this.customer.sex = value.sex;
    }
    this.customer.status = "0";

    await this.accountService.add(this.account).subscribe(
      result => {
        console.log(result);
        this.reponse = result.valueOf()
        if (this.reponse.body.statusCode == 200) {
          this.customerService.add(this.customer).subscribe(
            result => {
              console.log(result);
              this.reponse = result.valueOf()
              if (this.reponse.body.statusCode == 200) {
                this.redirectLogin();
              }
            });
        }
      });
  }

  redirectLogin() {
    this.reload.reload = "1";
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'loginshop');
  }
}
