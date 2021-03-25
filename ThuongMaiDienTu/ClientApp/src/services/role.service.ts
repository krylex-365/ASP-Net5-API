import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getRole() {
    return this.http.get<Role[]>(this.url + 'api/Role');
  }
}
