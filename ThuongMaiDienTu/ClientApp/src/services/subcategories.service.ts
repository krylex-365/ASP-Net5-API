import { HttpClient } from '@angular/common/http';
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
}
