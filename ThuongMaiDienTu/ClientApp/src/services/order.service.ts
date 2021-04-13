import { HttpClient } from '@angular/common/http';
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
}
