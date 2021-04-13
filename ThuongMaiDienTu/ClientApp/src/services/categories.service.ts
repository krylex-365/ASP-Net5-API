import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Categories } from '../models/Categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Categories[]>(this.url + 'api/Category');
  }

  update(category: Categories) {
    return this.http.put<HttpResponse<Account>>(this.url + 'api/Category', category, { observe: 'response' });
  }

  add(category: Categories) {
    return this.http.post<HttpResponse<Account>>(this.url + 'api/Category', category, { observe: 'response' });
  }

  delete(id: string) {
    return this.http.delete<HttpResponse<Account>>(this.url + 'api/Category/' + id, { observe: 'response' });
  }
}
