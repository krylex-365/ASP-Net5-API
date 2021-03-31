import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Dashboard } from '../models/Dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getNewOrders() {
    return this.http.get<Dashboard[]>(this.url + 'api/Dashboard');
  }
}
