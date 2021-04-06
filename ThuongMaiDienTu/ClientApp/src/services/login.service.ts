import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.prod';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  url = environment.url;
  account: Account;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(account: Account) {
    this.account = account;
    this.account.accountId = "0";
    this.account.avatar = "0";
    this.account.roleId = "0";
    this.account.customer = null;
    return this.http.post<HttpResponse<Account>>(this.url + 'api/Home', this.account, { observe: 'response' });
    /*result => {
        console.log(result);
        if (result.status == 200) {
          console.log(result.status);
          this.login = true;
          console.log(this.login);
          () => this.router.navigate(['/Role']);
        }
      }*/
  }

  logout() {
    return this.http.get(this.url + 'api/Home');
  }

}
