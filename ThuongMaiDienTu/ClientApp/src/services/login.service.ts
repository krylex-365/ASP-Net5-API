import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  url = environment.url;
  account: Account;
  logined: boolean;

  constructor(private http: HttpClient) {
    this.logined = false;
  }

  login(account: Account) {
    this.account = account;
    this.account.accountId = "0";
    this.account.avatar = "0";
    this.account.roleId = "0";
    this.account.customer = null;
    this.http.post<HttpResponse<Account>>(this.url + 'api/Home', this.account, { observe: 'response' })
      .subscribe(result => {
        console.log(result);
        if (result.status == 200) {
          console.log(result.status);
          this.logined = true;
          console.log(this.logined);
        }
      });
  }

  logout() {
    this.logined = false;
    return this.http.get(this.url + 'api/Home');
  }

  getStatus() {
    return this.logined;
  }
}
