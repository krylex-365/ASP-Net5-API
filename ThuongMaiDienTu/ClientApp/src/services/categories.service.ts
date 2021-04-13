import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Categories[]>(this.url + 'api/Categories');
    }
}
