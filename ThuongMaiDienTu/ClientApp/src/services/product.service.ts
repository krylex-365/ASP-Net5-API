import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.url + 'api/Product');
  }

  getProductById(id: string) {
    return this.http.get<Product>(this.url + 'api/Product/' + id);
  }

  add(product: Product) {
    return this.http.post<HttpResponse<Product>>(this.url + 'api/Product', product, { observe: 'response' });
  }

  update(product: Product) {
    return this.http.put<HttpResponse<Product>>(this.url + 'api/Product', product, { observe: 'response' });
  }

  delete(id: string) {
    return this.http.delete<HttpResponse<Product>>(this.url + 'api/Product/' + id, { observe: 'response' });
  }
}
