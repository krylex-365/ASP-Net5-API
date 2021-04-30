import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getAccounts() {
    return this.http.get<Account[]>(this.url + 'api/Account');
  }

  getAccountById(id: string) {
    return this.http.get<Account>(this.url + 'api/Account/' + id);
  }

  add(account: Account) {
    return this.http.post<HttpResponse<Account>>(this.url + 'api/Account', account, { observe: 'response' });
  }

  update(account: Account) {
    return this.http.put<HttpResponse<Account>>(this.url + 'api/Account', account, { observe: 'response' });
  }
}
