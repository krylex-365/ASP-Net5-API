import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Product[]>(this.url + 'api/Product');
  }
}
