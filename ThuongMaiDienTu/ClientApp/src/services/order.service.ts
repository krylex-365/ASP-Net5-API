import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Order[]>(this.url + 'api/Order');
  }
}