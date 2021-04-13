import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>(this.url + 'api/Customer');
  }
}
