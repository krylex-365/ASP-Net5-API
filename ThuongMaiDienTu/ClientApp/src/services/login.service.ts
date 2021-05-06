import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment.prod';
import { Account } from '../models/account';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  url = environment.url;
  account: Account;
  currentUser;

  constructor(private http: HttpClient, private router: Router) {
  }

  get user() {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }
    return this.currentUser;
  }

  set user(value) {
    this.currentUser = value;
    localStorage.setItem('user', JSON.stringify(value));
  }

  getuser(): any {
    try {
      return jwt_decode(this.currentUser.token);
      }
      catch (Error) {
        return null;
      }
  }

  login(account: Account) {
    this.account = account;
    this.account.accountId = "0";
    this.account.avatar = "0";
    this.account.roleId = "0";
    this.account.customer = null;
    /*return this.http.post<HttpResponse<Account>>(this.url + 'api/Home', this.account, { observe: 'response' });*/
    return this.http.post(this.url + 'api/Home', this.account).pipe(
      map(data => this.user = data)
    );
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
    this.user = null;
    return this.http.get(this.url + 'api/Home', { observe: 'response' });
  }

}

