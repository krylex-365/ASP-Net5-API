import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Customer } from '../models/customer';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class UserAddService {
  url = environment.url;
  constructor(private http: HttpClient) { }
  getCustomers() {
    return this.http.get<Customer[]>(this.url + 'api/Customer');
  }
  getAccounts() {
    return this.http.get<Account[]>(this.url + 'api/Adduser');
  }
}
