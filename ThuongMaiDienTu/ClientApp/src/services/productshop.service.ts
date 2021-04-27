import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductShopService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getEditProduct() {
    return this.http.get<Product[]>(this.url + 'api/Product');
  }
}
