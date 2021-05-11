import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Checkout } from '../models/checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  url = environment.url;
  constructor(private http: HttpClient) { }


  add(checkout: Checkout) {
    return this.http.post<HttpResponse<Checkout>>(this.url + 'api/Checkout', checkout, { observe: 'response' });
  }
}
