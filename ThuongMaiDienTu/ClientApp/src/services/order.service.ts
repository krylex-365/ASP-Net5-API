import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<Order[]>(this.url + 'api/Order');
  }

  getOrdersByCustomerId(customerId) {
    return this.http.get<Order[]>(this.url + 'api/Order/' + customerId);
  }

  update(order: Order) {
    return this.http.put<HttpResponse<Order>>(this.url + 'api/Order', order, { observe: 'response' });
  }

  updateById(id: string) {
    return this.http.put<HttpResponse<Order>>(this.url + 'api/Order/' + id, { observe: 'response' });
  }

  delete(id: string) {
    return this.http.delete<HttpResponse<Order>>(this.url + 'api/Order/' + id, { observe: 'response' });
  }
}
