import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { OrderDetail } from '../models/orderDetail';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getOrderDetails() {
    return this.http.get<OrderDetail[]>(this.url + 'api/OrderDetail');
  }

  update(orderDetail: OrderDetail) {
    return this.http.put<HttpResponse<OrderDetail>>(this.url + 'api/OrderDetail', orderDetail, { observe: 'response' });
  }

  delete(id: string) {
    return this.http.delete<HttpResponse<OrderDetail>>(this.url + 'api/OrderDetail/' + id, { observe: 'response' });
  }
}
