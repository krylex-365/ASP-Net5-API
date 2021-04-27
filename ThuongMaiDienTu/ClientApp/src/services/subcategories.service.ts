import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Subcategories } from '../models/Subcategories';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getSubcategories() {
    return this.http.get<Subcategories[]>(this.url + 'api/Subcategory');
  }

  update(subcategory: Subcategories) {
    return this.http.put<HttpResponse<Account>>(this.url + 'api/Subcategory', subcategory, { observe: 'response' });
  }

  add(subcategory: Subcategories) {
    return this.http.post<HttpResponse<Account>>(this.url + 'api/Subcategory', subcategory, { observe: 'response' });
  }

  delete(id: string) {
    return this.http.delete<HttpResponse<Account>>(this.url + 'api/Subcategory/' + id, { observe: 'response' });
  }
}
