import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Role } from '../models/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url + 'api/Role');
    /*.pipe(
      map(data => {
        const roles: Array<IRole> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            roles.push(data[id])
          }
        }
        return roles;
      })
    )*/
  }

  add(role: Role) {
    role.account = null;
    return this.http.post(this.url + 'api/Role', role);
  }

  delete(id: string) {
    return this.http.delete(this.url + 'api/Role/' + id);
  }
}
