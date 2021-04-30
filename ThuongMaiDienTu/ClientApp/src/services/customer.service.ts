import { HttpClient, HttpResponse } from '@angular/common/http';
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

  getCustomerById(id: string) {
    return this.http.get<Customer>(this.url + 'api/Customer/' + id);
  }

  add(customer: Customer) {
    return this.http.post<HttpResponse<Customer>>(this.url + 'api/Customer', customer, { observe: 'response' });
  }

  update(customer: Customer) {
    return this.http.put<HttpResponse<Customer>>(this.url + 'api/Customer', customer, { observe: 'response' });
  }

  delete(id: string) {
    return this.http.delete<HttpResponse<Customer>>(this.url + 'api/Customer/' + id, { observe: 'response' });
  }
}
