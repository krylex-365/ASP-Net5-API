import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Customer } from '../models/customer';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>(this.url + 'api/Customer');
  }
  getAccounts() {
    return this.http.get<Account[]>(this.url + 'api/Account');
  }

  addCustomers(customer: Customer) {
    return this.http.post<HttpResponse<Customer>>(this.url + 'api/Customer', customer, { observe: 'response' });
  }

  addAccounts(account: Account) {
    return this.http.post<HttpResponse<Account>>(this.url + 'api/Customer', account, { observe: 'response' });
  }
}
